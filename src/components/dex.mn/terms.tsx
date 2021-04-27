import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { Layout, Row, Col, Grid } from 'antd';
const { useBreakpoint } = Grid;

export const Terms = () => {
    const smallScreen = !useBreakpoint().lg;
    const isAccepted = sessionStorage.getItem("terms");
    const [isModalVisible, setIsModalVisible] = useState(isAccepted?false:true);

    const handleOk = () => {
        sessionStorage.setItem("terms", "accepted");
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <>
        <Modal title="Үйлчилгээний нөхцөл" 
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
            <Button key="submit" type="primary" onClick={handleOk}>
              Зөвшөөрч байна
            </Button>
        ]}
        >
            <div style={{height:"200px", overflowY:"scroll", padding:"5px"}}>
            <p style={{textAlign: "justify"}}>DEX.MN нь дэлхийн хамгийн хүчирхэг блокчэйн сүлжээ болох Solana сүлжээн дээр ажиллаж буй Serum DEX -н Монгол орчуулга юм. Serum DEX нь өөрөө 100% блокчэйн сүлжээн дээр ажилладаг "Decentralized Exchange" бөгөөд уг арилжааны платформыг ажиллуулдаг байгууллага гэж байхгүй. Бүх арилжаа нь блокчэйн сүлжээнд байрлуулсан програмын тусламжтайгаар нэг хэрэглэгчийн хэтэвчээс нөгөө хэрэглэгчийн хэтэвч хооронд шууд хийгддэг буюу P2P горимоор ажилладаг. Ингэсэнээр уламжлалт арилжааны биржүүд дээр гардаг хүний хүчин зүйлээс (орлого, зарлага хүлээх, баталгаажуулалт хүлээх гэх мэт) шалтгаалах хүндрэлүүд үгүй болно. Түүнийгээ дагаад арилжаанд оролцох бүх үүрэг хариуцлага нь танд өөрт тань очих бөгөөд буруу дансруу шилжүүлэх гэх мэт санамсаргүй байдлаар өөрийн крипто ассетыг алдсан тохиолдолд эргүүлэн олж авах боломжгүй юм. Та арилжаанд оролцохоос өмнө Serum DEX- н гарын авлага материалуудтай сайтар танилцаж байж арилжаанд оролцох ёстойг анхааруулж байна. Та анхаарал болгоомжгүй байдлаасаа болоод эсвэл төвлөрсөн бус арилжаанд оролцох мэдлэг дутмаг байдлаасаа болоод хохирол хүлээсэн бол DEX.MN хариуцахгүй болохыг анхааруулж байна! </p>
            </div>
        </Modal>
        </>
    )
}