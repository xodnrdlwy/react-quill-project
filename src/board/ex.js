import axios from "axios";

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


const logout = async () => {
    try {
        // Server 로 post 요청
        const response = await axios.post('/logout');

        if (response.status === 200) {
            navigate("/");  // navigate hook 으로 메인페이지 이동
        }
    } catch (error) {
        console.error(error);
        // 오류 처리
    }
};


return (


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
);