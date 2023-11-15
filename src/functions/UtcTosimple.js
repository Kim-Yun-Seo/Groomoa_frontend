const UtcTosimple = ({end_date}) => {
    const jsonDate = end_date;
    const date = new Date(end_date);
    const month = (date.getUTCMonth()+1).toString().padStart(2,"0");
    const day = date.getUTCDate().toString().padStart(2,"0");
    const convertedDate = `${month}/${day}`
    return(
        <>
        {convertedDate}
        </>
    )
}

export default UtcTosimple;