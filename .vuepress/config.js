const { description } = require('../package')

module.exports = {
  title: 'Kelvin\'s Ethereum Book',

  description: description,

  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
  ],

  locales: {
    '/book/': {
      lang: 'en-US',
      title: 'Kelvin\'s Ethereum Book',
      description: description,
    }
  },

  themeConfig: {
    repo: 'smartcontracts/ethereum-book',
    editLinks: true,
    docsDir: 'src',
    docsBranch: 'main',
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: false,
    algolia: {
      appId: '2KUJYE5BP1',
      apiKey: 'f07e286e9f7cb070f2cd23fc10cc1517',
      indexName: 'eth2-book'
    },
    nav: [],
    sidebar: {
      '/book': [
        {
          title: 'Introduction',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            '/book/00__introduction/00__foreword.md',
            '/book/00__introduction/01__motivation.md',
            '/book/00__introduction/02__content.md',
          ]
        },
        {
          title: 'The Basics of Consensus',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            '/book/01__consensus/00__index.md',
            '/book/01__consensus/01__origins.md',
            '/book/01__consensus/02__terminology.md',
            '/book/01__consensus/03__simple-consensus.md',
            '/book/01__consensus/04__crash-faults.md',
            '/book/01__consensus/05__byzantine-faults.md',
            '/book/01__consensus/06__applications.md',
          ]
        },
        {
          title: 'The Origins of Blockchains',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            '/book/02__blockchains/00__index.md',
            '/book/02__blockchains/01__digital-cash.md',
            '/book/02__blockchains/02__open-access.md',
            '/book/02__blockchains/03__chains-of-blocks.md',
            '/book/02__blockchains/04__fork-choice-rules.md',
            '/book/02__blockchains/05__applications.md',
            '/book/02__blockchains/06__participation.md',
          ]
        },
        {
          title: 'Revisiting Eth1',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            '/book/03__eth1/00__index.md',
            '/book/03__eth1/01__basics.md',
            '/book/03__eth1/02__state.md',
            '/book/03__eth1/03__transactions.md',
            '/book/03__eth1/04__evm.md',
            '/book/03__eth1/05__blocks.md',
            '/book/03__eth1/06__fork-choice-rule.md',
            '/book/03__eth1/07__clients.md',
          ]
        },
        {
          title: 'Exploring Eth2',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            '/book/04__eth2-overview/00__index.md',
            '/book/04__eth2-overview/01__historical-context.md',
            '/book/04__eth2-overview/02__project-philosophy.md',
            '/book/04__eth2-overview/03__key-concepts.md',
            '/book/04__eth2-overview/04__development-process.md',
            '/book/04__eth2-overview/05__learning-goals.md',
          ]
        },
        {
          title: 'Proof of Stake in Ethereum',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            '/book/05__proof-of-stake/00__index.md',
            '/book/05__proof-of-stake/01__core-concepts.md',
            '/book/05__proof-of-stake/02__basic-operation.md',
            '/book/05__proof-of-stake/03__fork-choice.md',
            '/book/05__proof-of-stake/04__long-range-attacks.md',
            '/book/05__proof-of-stake/05__casper-ffg.md',
            '/book/05__proof-of-stake/06__weak-subjectivity.md',
          ]
        },
        {
          title: 'Eth2 Building Blocks',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            '/book/06__building-blocks/00__index.md',
            '/book/06__building-blocks/01__bls-signatures.md',
            '/book/06__building-blocks/02__randomness.md',
            '/book/06__building-blocks/03__ssz.md',
            '/book/06__building-blocks/04__committees.md',
            '/book/06__building-blocks/05__deposit-contract.md',
          ]
        },
        {
          title: 'Building the Beacon Chain',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            '/book/07__beacon-chain/00__index.md',
            '/book/07__beacon-chain/01__validator-life-cycle.md',
            '/book/07__beacon-chain/02__validator-duties.md',
            '/book/07__beacon-chain/03__structure.md',
          ]
        },
      ],
    }
  },

  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    [
      '@maginapp/vuepress-plugin-katex',
      {
        delimiters: 'dollars'
      },
    ],
    [
      'vuepress-plugin-export',
      {
        bundles: [{
          filter: /\/book\//,
          dest: (siteConfig) => `${siteConfig.title}.pdf`,
        }]
      }
    ]
  ]
}
