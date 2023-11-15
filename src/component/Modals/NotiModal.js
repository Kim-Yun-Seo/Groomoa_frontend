const NotiModal = ({isOpen, alarmList}) => {
    return (
        <div>
            {isOpen && 
                <div>
                    <p>알람모달</p>
                </div>
            }
        </div>
    )
}
export default NotiModal;