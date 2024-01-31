import {Card, List, Button, message, Popconfirm, Flex } from "antd";
import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import {useNavigate} from "react-router-dom";
export function BoardDetail () {
    const navigate = useNavigate();
    const [boardData, setBoardData] = useState([]);
    const {bid} = useParams();


    // 시간 몇분 전 , 방금 전
    function getTimeAgo(commentDate) {
        const currentDate = new Date();
        const commentDateObj = new Date(commentDate);

        const timeDifference = currentDate - commentDateObj;
        const minutesAgo = Math.floor(timeDifference / (1000 * 60));

        if (minutesAgo < 1) {
            return "방금 전";
        } else if (minutesAgo < 60) {
            return `${minutesAgo}분 전`;
        } else if (minutesAgo < 1440) {
            const hoursAgo = Math.floor(minutesAgo / 60);
            return `${hoursAgo}시간 전`;
        } else {
            const daysAgo = Math.floor(minutesAgo / 1440);
            return `${daysAgo}일 전`;
        }
    }


    useEffect(() => {
        axios.get(`/showBoard/${bid}`)
            .then(response => {
                setBoardData(response.data);
                console.log("response Data : {} ", response.data);
            })
            .catch(error => {
                console.error("Error Axios Data :", error);
            })
    }, [bid]);


    const confirm = (e) => {

        axios.delete(`/deleteBoard/${bid}`)
            .then(response => {
                console.log(response.data);
                message.success('삭제 되었습니다.');
                navigate("/board/list");
            })
            .catch(error => {
                console.error('Error deleting board:', error);
                message.error('Error deleting board');
            });

    };
    const cancel = (e) => {
        message.error('취소하였습니다.');
    };

    const updateButton = (e) => {
        navigate(`/board/modify/${bid}`);
    }
    return (
        <>
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 3,
                }}
            >
                <List.Item>
                    <Card title={boardData.title}>
                        <p>{boardData.nickname}</p>
                        <div dangerouslySetInnerHTML={{__html: boardData.content}} />
                        <p>{getTimeAgo(boardData.regdate)}</p>
                    </Card>
                </List.Item>
            </List>
            <Flex wrap="wrap" gap="small" className="site-button-ghost-wrapper">

                <Popconfirm
                    title="게시물 수정"
                    description="수정하시겠습니까 ?"
                    okText="예"
                    cancelText="아니오"
                    onConfirm={updateButton}
                    onCancel={cancel}
                >
                    <Button type="primary" ghost >
                        Update
                    </Button>
                </Popconfirm>
            <Popconfirm
                title="게시물 삭제"
                description="삭제하시겠습니까 ?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="예"
                cancelText="아니오"
            >
                <Button danger>Delete</Button>
            </Popconfirm>
            </Flex>
        </>
    );
}