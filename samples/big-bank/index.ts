import structurizr from '../../src'

import systemLandscape from './system-landscape'
import systemContext from './system-context'
import internetBankingSystemContainer from './internet-banking-system.container'
import webApplicationComponent from './web-application.component'

structurizr.generate([
  systemLandscape,
  systemContext,
  internetBankingSystemContainer,
  webApplicationComponent,
], { format: 'png' }).then(() => console.log('Done!'));


//TODO add custom styles
