import { Payment } from "zmp-sdk";
import appConfig from "../../app-config.json";
import { getConfig } from "../components/config-provider";

const pay = (amount: number, description?: string) =>
  new Promise((resolve, reject) => {
    Payment.createOrder({
      desc: description ?? `Thanh toán cho ${appConfig.app.title}`,
      item: [],
      amount:
        amount + Number(getConfig((config) => config.template.shippingFee)),
      success: (data) => {
        console.log("success: ", data);
        resolve(data);
      },
      fail: (err) => {
        console.log("err: ", err);
        reject(err);
      },
    });
  });

export default pay;
