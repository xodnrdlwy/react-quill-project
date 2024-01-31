import React, { useEffect, useState } from 'react';
import { Card, List } from 'antd';
import axios from "axios";

export function BoardList() {
    const [boardData, setBoardData] = useState([]);


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
        axios.get("/viewList")
            .then(response => {
                setBoardData(response.data);
            })
            .catch(error => {
                console.error("Error Axios Data :", error);
            })
    }, []);  // Add an empty dependency array to useEffect to run it only once

    return (
        <>
            {boardData.length > 0 ? (
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
                    dataSource={boardData}
                    renderItem={(item) => (
                        <List.Item>
                            <Card title={item.title}>
                                <p>{item.nickname}</p>
                                <div dangerouslySetInnerHTML={{ __html: item.content }} />
                                <p>{getTimeAgo(item.regdate)}</p>
                            </Card>
                        </List.Item>
                    )}
                />
            ) : (
                <p>No data available</p>
            )}
        </>
    );
}
