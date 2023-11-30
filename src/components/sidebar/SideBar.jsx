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
        <Col className="border border-black max-w-fit p-1 m-4 rounded-xl h-fit">
            <Row className="text-center flex items-center justify-center">
                <Typography className=" font-bold">
                Favourite Queries
                </Typography>
            </Row>

            {allQueries.map((query,index) => {
                return <QueryItem queryCode={query.queryCode} queryDesc={query.queryDesc} key={index}/>
                // key should technically be something else and not index
            })}

            <Row className=" flex justify-center mt-2">
                <button className=" bg-blue-500 text-white rounded-xl pl-4 pr-4 p-2" onClick={() => setIsModalOpen(true)}>Add new query</button>
            </Row>

            <Modal title="Add new query" open={isModalOpen} onOk={myForm.submit} onCancel={handleCancel} okButtonProps={{ style: { backgroundColor: '#08c' } }}>
                <Form form={myForm} onFinish={handleOk}>
                    <Form.Item label="Code" name={"code"} rules={[{ required: true, message: 'Please input code!' }]}>
                        <Input placeholder="Add query code" />
                    </Form.Item>
                    <Form.Item label="Description" name={"description"} rules={[{ required: true, message: 'Please input description!' }]}>
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