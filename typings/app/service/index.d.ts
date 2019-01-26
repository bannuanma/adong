// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCreditCard from '../../../app/service/creditCard';
import ExportHome from '../../../app/service/home';
import ExportIns from '../../../app/service/ins';
import ExportTest from '../../../app/service/Test';

declare module 'egg' {
  interface IService {
    creditCard: ExportCreditCard;
    home: ExportHome;
    ins: ExportIns;
    test: ExportTest;
  }
}
