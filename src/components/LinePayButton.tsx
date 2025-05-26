import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { nginxApi } from "@/js/bootstrap";

const LinePayButton = () => {
  const [paymentUrl, setPaymentUrl] = useState(null);

  const handlePayment = async () => {
    try {
      const response = await nginxApi.post("/linepay/request");
      if (response.data.info && response.data.info.paymentUrl) {
        setPaymentUrl(response.data.info.paymentUrl.web);
      }
    } catch (error) {
      console.error("支付請求失敗", error);
    }
  };

  return (
    <div>
      <Button onClick={handlePayment}>
        Line Pay 付款測試 (給我錢! 我要全部!)
      </Button>
      {paymentUrl && (
        <div>
          <p>請點擊下方連結進行付款：</p>
          <a href={paymentUrl} target="_blank" rel="noopener noreferrer">
            前往付款
          </a>
        </div>
      )}
    </div>
  );
};

export default LinePayButton;
