import React, { useState } from "react"
import { Col, Form, Input, Modal, Row, Typography } from "antd"
import { QueryItem } from "./QueryItem"
import TextArea from "antd/es/input/TextArea"
import { useAppContext } from "../../context/AppContext"

const SideBar = () => {
    const { allQueries, addNewQuery }=useAppContext();
    

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [myForm] = Form.useForm();
    
    const handleOk = (values) => {        
        addNewQuery(values);
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };     

    return <>
        <Col className=" bg-codeEditorBg max-w-fit p-4 m-4 rounded-xl h-fit sticky top-0">
            <Row className="text-center flex items-center justify-center">
                <Typography className=" font-sans text-white font-bold text-lg">
                Pinned Queries
                </Typography>
            </Row>

            {allQueries.map((query,index) => {
                return <QueryItem queryCode={query.queryCode} queryDesc={query.queryDesc} key={index}/>
                // key should technically be something else and not index
            })}

            <Row className=" flex justify-center mt-4">
                <button className=" bg-greyLight m-4 w-[200px] text-greenFont text-base font-bold font-sans rounded-xl p-2" onClick={() => setIsModalOpen(true)}>Add new query</button>
            </Row>

            <Modal title="Add new query" open={isModalOpen} onOk={myForm.submit} onCancel={handleCancel} cancelButtonProps={{style:{color:"white", border:"0px"}}} okButtonProps={{ style: { backgroundColor: '#211A2A', color:"#3CDF61", fontFamily:"sans-serif", fontWeight:"bold" } }}>
                <Form form={myForm} onFinish={handleOk}>
                    <Form.Item label={
                        <span className=" text-white text-base font-sans mr-2">SQL Query</span>
                    } name={"code"} colon={false} rules={[{ required: true, message: 'Please input code!' }]}>
                        <Input placeholder="Add query code" />
                    </Form.Item>
                    <Form.Item label={
                        <span className=" text-white text-base font-sans">Description</span>
                    }  name={"description"} colon={false} rules={[{ required: true, message: 'Please input description!' }]}>
                        <TextArea placeholder="Add desc" />
                    </Form.Item>
                </Form>
            </Modal>
        </Col>
    </>
}

export default React.memo(SideBar);

//technically this memoization isnt helping much as we end up with a shallow comparasion and appContext returns a new 
//reference each time.