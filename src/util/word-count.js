const fs = require('fs')
const path = require('path')

const count_words = (text) => {
    const normalized = text.replace(/[.,?!;()"'-]/g, ' ').replace(/s+/g, ' ').toLowerCase().split(' ')
    return normalized.length
}

const get_all_files = (dir_path, all_files = []) => {
    const files = fs.readdirSync(dir_path)

    files.forEach((file) => {
        if (fs.statSync(`${dir_path}/${file}`).isDirectory()) {
            all_files = get_all_files(`${dir_path}/${file}`, all_files)
        } else {
            all_files.push(`${dir_path}/${file}`)
        }
    })

    return all_files
}

const arr_sum = (arr) => {
    return arr.reduce((a, b) => a + b, 0)
}

const main = () => {
    const dir_path = process.argv[2]
    const files = get_all_files(dir_path)

    const word_counts = files.reduce((word_counts, file) => {
        const text = fs.readFileSync(file, {
            encoding: 'utf8'
        })
        word_counts[file] = count_words(text)
        console.log(file, word_counts[file])
        return word_counts
    }, {})

    const total_word_count = arr_sum(Object.values(word_counts))
    console.log('Total:', total_word_count)
}

main()