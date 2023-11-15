const MsgModal = ({isOpen, msgList}) => {
    return (
        <div>
            {isOpen && 
                <div>
                    <p>메세지모달</p>
                </div>
            }
        </div>
    )
}
export default MsgModal;