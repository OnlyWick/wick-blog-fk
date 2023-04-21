import { Divider, Image } from "antd";
import { useState } from "react";
import styled from "styled-components";

const AlbumItemWrapper = styled.div`
  padding-right: 60px;
`;

const AlbumItemTimeline = styled.div``;
const AlbumItemContent = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

interface AlbumItemImageProps {
  mode?: boolean;
}

const AlbumItemImage = styled.li<AlbumItemImageProps>`
  width: ${(props) => (props.mode ? "100%" : "auto")};

  & {
    .ant-image {
      margin: 4px;
    }
  }
`;

const AlbumItemDay = styled.div`
  margin: 4px;
  color: #bdbdbd;
`;

export default function AlbumItem() {
  const [isDetailMode, setDetailMode] = useState(true);

  const handleDetailMode = function () {
    setDetailMode(true);
  };

  return (
    <AlbumItemWrapper>
      <AlbumItemTimeline>
        <Divider plain>4 月</Divider>
      </AlbumItemTimeline>
      <AlbumItemContent>
        <Image.PreviewGroup>
          <AlbumItemImage mode={true}>
            {isDetailMode && <AlbumItemDay>今天</AlbumItemDay>}
            <Image src="https://p3-passport.byteimg.com/img/user-avatar/3d99b843527461e48ee39069bcd52ece~180x180.awebp"></Image>
          </AlbumItemImage>
          <AlbumItemImage>
            <Image src="https://p3-passport.byteimg.com/img/user-avatar/3d99b843527461e48ee39069bcd52ece~180x180.awebp"></Image>

            <Image src="https://p3-passport.byteimg.com/img/user-avatar/3d99b843527461e48ee39069bcd52ece~180x180.awebp"></Image>
          </AlbumItemImage>
          <AlbumItemImage>
            <Image src="https://p3-passport.byteimg.com/img/user-avatar/3d99b843527461e48ee39069bcd52ece~180x180.awebp"></Image>
          </AlbumItemImage>

          <AlbumItemImage>
            <Image src="https://p3-passport.byteimg.com/img/user-avatar/3d99b843527461e48ee39069bcd52ece~180x180.awebp"></Image>
          </AlbumItemImage>
          <AlbumItemImage>
            <Image src="https://p3-passport.byteimg.com/img/user-avatar/3d99b843527461e48ee39069bcd52ece~180x180.awebp"></Image>
          </AlbumItemImage>
          <AlbumItemImage>
            <Image src="https://p3-passport.byteimg.com/img/user-avatar/3d99b843527461e48ee39069bcd52ece~180x180.awebp"></Image>
          </AlbumItemImage>
        </Image.PreviewGroup>
      </AlbumItemContent>
    </AlbumItemWrapper>
  );
}
