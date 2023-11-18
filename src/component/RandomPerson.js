import { useEffect, useState } from 'react'
import user1 from '../images/users/user1.svg'
import user2 from '../images/users/user2.svg'
import user3 from '../images/users/user3.svg'
import user4 from '../images/users/user4.svg'
import user5 from '../images/users/user5.svg'
import user6 from '../images/users/user6.svg'

const images = [user1, user2, user3, user4, user5, user6];

const RandomImage = () => {
  const [randomImage, setRandomImage] = useState(null);

  useEffect(() => {
    // 랜덤한 이미지 선택
    const randomIndex = Math.floor(Math.random() * images.length);
    const selectedImage = images[randomIndex];

    // 선택된 이미지를 상태에 설정
    setRandomImage(selectedImage);
  }, []); // 빈 배열은 컴포넌트가 처음 렌더링될 때 한 번만 실행

  if (!randomImage) {
    return <div>Loading...</div>; // 선택된 이미지가 없을 경우 로딩 메시지 출력
  }

  return (
    // {randomImage}
    <div>
      <img src={randomImage} alt="Random" />
    </div>
  );
};

export default RandomImage;
