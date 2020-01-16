---
path: "/chapters/building-blocks/ssz"
title: "Simple Serialize (SSZ)"
---

Simple Serialize (SSZ) is the serialization format used within Eth2. SSZ is built upon two basic types, unsigned integers and booleans. SSZ allows for 8,16,32,64,128, and 256 bit integers. It also has composite types, containers, vectors, lists, bitvectors, bitlists, and unions. Some of these are fixed size, some are variable sized. 

Some values have defaults:

- uintN: 0
- boolean: false
- Container: [default(type) for type in container]
- Vector[type, N]: [default(type) * N]
- BitVector[boolean, N]: [False] * N
- List[type, N]: []
- Bitlist[boolean, N]: []
- Union[type_0, type_1, ...]: default(type_0)

is_zero(object) returns true if equal to default type

Empty vector types are illegal
Containers with no fields are illegal
Null type only legal as first type in union subtype

Serialization:
- uintN: to bytes n // bits per byte, little endian
- boolean: 01 if true or 00 if false
- null: empty
- Bitvector[N]: convert each thing to 00 or 01 and concatenate
- Bitlist[N]: sort of same as above except need to calculate list size
- other composites: serialize fixed and variable parts, leave empty spaces; check lengths; interleave OFFSETS for variable parts; concatenate
- unions: serialize value.value and concatenate with value.type_index

Deserialization:
- Bytestring at most one object it can deseralize to
- Basic objects is easy (just reverse serailization)
- Fixed-size also easy (do recursively)
- Variable size:
    - Vector/list: First offset gives total number of bytes in first offset; size of each additional object from last object; total bytes must be known
    - Containers: Same principles; can also have fixed-size parts
    - Bitlist: last bit always set, use this to infer size
- Must harden against invalid inputs
    - Offsets: out of order, range, mismatching minimum element size
    - Scope: extra unused bytes, not aligned with element size
    - More elements than list allows

Merklization:
- size_of(B) gives length for basic types in bytes
- chunk_count(type):
    - basic: 1
    - Bitlist or Bitvector (n + 255) // 256
    - List or Vector for basic types: (n * size_of(B) + 31) // 32
    - List or Vector for composites: N
    - containers: len(fields)
- bitfield_bytes(bits): bits of bitlist/vector
- pack: pack them into bytes-per-chunk chunks, rpad last chunk with zeros
- next_pow_of_two(i): next power of 2 after i, including i if is power of 2
- merklize(chunks, limit=None):
    - no limit: pad with zero chunks to next pow of 2
    - limit > len: pad chunks to specific limit
    - limit < len: do not merklize
    - 1 chunk, chunk is root
    - >1 chunks, binary tree merkle
- mix_in_length: return hash(root + length)
- mix_in_type: return hash(root + type_index)
- hash_tree_root(value):
    - basic or vector of basics: merklize(pack(value))
    - bitvectors: merklize(bitfield_bytes(value), limit=chunk_count(type)) 
    - list of basics: mix_in_length(merklize(pack(value)), limit=chunk_count(value), len(value))
    - bitlists: mix_in_length(merkleize(bitfield_bytes(value), limit=chunk_count(type)), len(value))
    - vector of compisites or container: merkleize([hash_tree_root(element) for element in value])
    - list of composites: mix_in_length(merkleize([hash_tree_root(element) for element in value], limit=chunk_count(type)), len(value))
    - union: mix_in_type(merkleize(value.value), value.type_index)

Summaries and expansions:
- B original object, A derived by replacing values of B with their hash_tree_root
- A is "summary" of B, B is "expansion" of A
- Hash tree root is still the same
- Similar for "summary types" and "expansion types"