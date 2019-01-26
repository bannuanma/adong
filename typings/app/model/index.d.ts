// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCardActivity from '../../../app/model/cardActivity';
import ExportCardActRela from '../../../app/model/cardActRela';
import ExportCardCardRela from '../../../app/model/cardCardRela';
import ExportCardInfo from '../../../app/model/cardInfo';
import ExportCardUser from '../../../app/model/cardUser';
import ExportGreeting from '../../../app/model/greeting';
import ExportIndex from '../../../app/model/index';
import ExportInsInfo from '../../../app/model/insInfo';
import ExportInsUser from '../../../app/model/insUser';

declare module 'egg' {
  interface IModel {
    CardActivity: ReturnType<typeof ExportCardActivity>;
    CardActRela: ReturnType<typeof ExportCardActRela>;
    CardCardRela: ReturnType<typeof ExportCardCardRela>;
    CardInfo: ReturnType<typeof ExportCardInfo>;
    CardUser: ReturnType<typeof ExportCardUser>;
    Greeting: ReturnType<typeof ExportGreeting>;
    Index: ReturnType<typeof ExportIndex>;
    InsInfo: ReturnType<typeof ExportInsInfo>;
    InsUser: ReturnType<typeof ExportInsUser>;
  }
}
