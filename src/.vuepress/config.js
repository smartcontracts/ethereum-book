const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'The Eth2 Book',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [],
    sidebar: {
      '/book/': [
        {
          title: 'Introduction',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            {
              title: 'Index',
              path: '/book/00__introduction/00__index.md'
            },
            {
              title: 'Motivation',
              path: '/book/00__introduction/01__motivation.md'
            },
            {
              title: 'Content',
              path: '/book/00__introduction/02__content.md'
            },
          ]
        },
        {
          title: 'Consensus',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            {
              title: 'Index',
              path: '/book/01__consensus/00__index.md'
            },
            {
              title: 'Origins',
              path: '/book/01__consensus/01__origins.md'
            },
            {
              title: 'Crash Faults',
              path: '/book/01__consensus/02__crash-faults.md'
            },
            {
              title: 'Byzantine Faults',
              path: '/book/01__consensus/03__byzantine-faults.md'
            },
            {
              title: 'Applications',
              path: '/book/01__consensus/04__applications.md'
            },
          ]
        },
        {
          title: 'Blockchains',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            {
              title: 'Index',
              path: '/book/02__blockchains/00__index.md'
            },
            {
              title: 'Digital Cash',
              path: '/book/02__blockchains/01__digital-cash.md'
            },
            {
              title: 'Open Access',
              path: '/book/02__blockchains/02__open-access.md'
            },
            {
              title: 'Chains of Blocks',
              path: '/book/02__blockchains/03__chains-of-blocks.md'
            },
            {
              title: 'Fork Choice Rules',
              path: '/book/02__blockchains/04__fork-choice-rules.md'
            },
            {
              title: 'Applications',
              path: '/book/02__blockchains/05__applications.md'
            },
            {
              title: 'Participation',
              path: '/book/02__blockchains/06__participation.md'
            },
          ]
        },
        {
          title: 'Eth1',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            {
              title: 'Index',
              path: '/book/03__eth1/00__index.md'
            },
            {
              title: 'Basics',
              path: '/book/03__eth1/01__basics.md'
            },
            {
              title: 'State',
              path: '/book/03__eth1/02__state.md'
            },
            {
              title: 'Transactions',
              path: '/book/03__eth1/03__transactions.md'
            },
            {
              title: 'EVM',
              path: '/book/03__eth1/04__evm.md'
            },
            {
              title: 'Blocks',
              path: '/book/03__eth1/05__blocks.md'
            },
            {
              title: 'Fork Choice Rule',
              path: '/book/03__eth1/06__fork-choice-rule.md'
            },
            {
              title: 'Clients',
              path: '/book/03__eth1/07__clients.md'
            },
            {
              title: 'Scaling',
              path: '/book/03__eth1/08__scaling.md'
            },
          ]
        },
        {
          title: 'Eth2 Overview',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            {
              title: 'Index',
              path: '/book/04__eth2-overview/00__index.md'
            },
            {
              title: 'Historical Context',
              path: '/book/04__eth2-overview/01__historical-context.md'
            },
            {
              title: 'Project Philosophy',
              path: '/book/04__eth2-overview/02__project-philosophy.md'
            },
            {
              title: 'Key Concepts',
              path: '/book/04__eth2-overview/03__key-concepts.md'
            },
            {
              title: 'Development Process',
              path: '/book/04__eth2-overview/04__development-process.md'
            },
            {
              title: 'Learning Goals',
              path: '/book/04__eth2-overview/05__learning-goals.md'
            },
          ]
        },
        {
          title: 'Proof of Stake',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            {
              title: 'Index',
              path: '/book/05__proof-of-stake/00__index.md'
            },
            {
              title: 'Core Concepts',
              path: '/book/05__proof-of-stake/01__core-concepts.md'
            },
            {
              title: 'Basic Operation',
              path: '/book/05__proof-of-stake/02__basic-operation.md'
            },
            {
              title: 'Fork Choice',
              path: '/book/05__proof-of-stake/03__fork-choice.md'
            },
            {
              title: 'Long Range Attacks',
              path: '/book/05__proof-of-stake/04__long-range-attacks.md'
            },
            {
              title: 'Casper FFG',
              path: '/book/05__proof-of-stake/05__casper-ffg.md'
            },
            {
              title: 'Weak Subjectivity',
              path: '/book/05__proof-of-stake/06__weak-subjectivity.md'
            },
          ]
        },
        {
          title: 'Building Blocks',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            {
              title: 'Index',
              path: '/book/06__building-blocks/00__index.md'
            },
            {
              title: 'BLS Signatures',
              path: '/book/06__building-blocks/01__bls-signatures.md'
            },
            {
              title: 'Randomness',
              path: '/book/06__building-blocks/02__randomness.md'
            },
            {
              title: 'SSZ',
              path: '/book/06__building-blocks/03__ssz.md'
            },
            {
              title: 'Committees',
              path: '/book/06__building-blocks/04__committees.md'
            },
            {
              title: 'Deposit Contract',
              path: '/book/06__building-blocks/05__deposit-contract.md'
            },
          ]
        },
        {
          title: 'Beacon Chain',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            {
              title: 'Index',
              path: '/book/07__beacon-chain/00__index.md'
            },
            {
              title: 'Validator Life Cycle',
              path: '/book/07__beacon-chain/01__validator-life-cycle.md'
            },
            {
              title: 'Validator Duties',
              path: '/book/07__beacon-chain/02__validator-duties.md'
            },
            {
              title: 'Structure',
              path: '/book/07__beacon-chain/03__structure.md'
            },
          ]
        },
      ],
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    [
      'vuepress-plugin-mathjax',
      {
        target: 'svg',
      },
    ],
  ]
}
