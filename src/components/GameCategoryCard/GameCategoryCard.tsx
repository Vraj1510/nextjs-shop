import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gameCategoryCardClassNames from './gameCategoryCardClassNames';
interface GameCategoryCardprops {
  categoryImage: string;
  categoryName: string;
  slug: string;
}
const GameCategoryCard: FC<GameCategoryCardprops> = (props) => {
  const { categoryImage, categoryName, slug } = props;
  const { image, name, container, arrow } = gameCategoryCardClassNames;
  return (
    <Link href={`categories/${slug}`} className={container}>
      <Image src={categoryImage} alt={categoryName} width={200} height={200} className={image}></Image>
      <h3 className={name}>{categoryName}</h3>
      <Image src="/images/arrow.svg" alt="view" width={20} height={20} className={arrow}></Image>
    </Link>
  );
};

export default GameCategoryCard;
