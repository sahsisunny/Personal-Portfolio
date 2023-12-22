// import portFolio from './../../../public/assets/projects/portfolio.png'
import xprobba from './../../../public/assets/projects/xprobba.png'
import websitescrapper from './../../../public/assets/projects/websitescrapper.png'
import emojiSearchEngine from './../../../public/assets/projects/emojisearch.png'
import knowYourEmoji from './../../../public/assets/projects/knowyouremoji.png'
import gitrackr from './../../../public/assets/projects/gittrackr.png'

export const projectList = [
    {
       title: 'Personal Portfolio👨‍💻',
       description: 'Showcase your education, experience, projects and skills',

       details:
          'This is my personal portfolio website. It is built using Next.js and Tailwind CSS. It is hosted on Netlify. It is a static website and is very fast. It is also responsive and looks good on all devices.',
       techStack: ['NextJS, Tailwind'],
       image: websitescrapper,
       liveLink: 'https://sahsisunny.netlify.app/',
       repoLink: 'https://github.com/sahsisunny/Personal-Portfolio',
    },
    {
       title: 'xProBBA🤖',
       description: 'Bug Bounty Automaton',
       details:
          'xProBBA is a bug bounty automation tool. It is built using Bash. It is a CLI tool and is very fast. It is also very easy to use. It can be used to automate the process of finding subdomains, finding open ports, finding open services, finding open directories etc.',
       techStack: ['Bash, Linux'],
       image: xprobba,
       liveLink: 'https://www.youtube.com/watch?v=M4c0uWheyvY',
       repoLink: 'https://github.com/sahsisunny/xProBBA',
    },
    {
       title: 'Website Scrapper🕷️',
       description: 'Extract Data from Flipkart, Twitter',
       details:
          'This is a data scrapper tool. It is built using Python. It can be used to extract data from Flipkart like product name, price, rating, number of ratings, product link, product image link etc. It can also be used to extract data from Twitter like tweets, tweet links, tweet image links etc.',
       techStack: ['Python, Linux'],
       image: websitescrapper,
       liveLink: 'https://www.youtube.com/watch?v=xlX0bZGo5lM',
       repoLink: 'https://github.com/sahsisunny/Website-Scrapper-Project',
    },
    {
       title: 'Emoji Search Engine🔍',
       description: 'Search for emojis',
       details:
          'This is an emoji search engine. It is built using React.js and CSS. In this project, I have used the emoji API to fetch the emojis. It is hosted on Netlify. It is a static website and is very fast. It is also responsive and looks good on all devices.',
       techStack: ['React.js, CSS, Netlify'],
       image: emojiSearchEngine,
       liveLink: 'https://emojisearchengine.netlify.app/',
       repoLink:
          'https://github.com/sahsisunny/Know-your-emoji/tree/emoji-search-engine',
    },
    {
       title: 'Know Your Emoji🤔',
       description: 'Know the meaning of emojis',
       details:
          'This is a know your emoji app. It is built using React.js and CSS. In this project, I have used JSON file to store the data of emojis. In this app also show the random emoji.',
       techStack: ['React.js, CSS, NextJS, TypeScript'],
       image: knowYourEmoji,
       liveLink: 'https://knowyouremojiv2.netlify.app/',
       repoLink: 'https://github.com/sahsisunny/Know-your-emoji',
    },
    {
       title: 'Gitrackr📊',
       description: 'Track assinged and PRs from orgs',
       details:
          'This is a Gittrackr app. It is built using React.js. In this project, I have used the GitHub API to fetch the data. It is hosted on Netlify.It is also responsive and looks good on all devices. ITs fetch the data from the github like pull request, issues and assigned issues. I have alse added the feature to filter the data. and show stats of the data.',
       techStack: ['React.js, Tailwind, Netlify'],
       image: gitrackr,
       liveLink: 'https://gittrackr.netlify.app/',
       repoLink: 'https://github.com/sahsisunny/git-dashboard/',
    },
 ]
 