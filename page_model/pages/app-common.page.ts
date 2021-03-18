import { Selector } from "testcafe";

export class AppCommon {
  errorMessage = Selector("h3[data-test=\"error\"]");
}
