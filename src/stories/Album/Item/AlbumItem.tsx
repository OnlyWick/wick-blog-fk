import { AlertProps, Button, Divider, Image } from "antd";
import { useState } from "react";
import styled from "styled-components";

const AlbumItemWrapper = styled.div`
  display: flex;
`;

const AlbumItemLeft = styled.div`
  flex: 1;
`;

const AlbumItemRight = styled.div`
  width: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ccc;
`;

const AlbumItemTimeline = styled.div``;
const AlbumItemContent = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

interface AlbumItemImageProps {
  mode?: "thumbnail" | "detail";
}

const AlbumItemImage = styled.li<AlbumItemImageProps>`
  width: ${(props) => (props.mode === "detail" ? "100%" : "auto")};

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

interface AlbumItemProps {
  mode?: "thumbnail" | "detail";
}

export default function AlbumItem({ mode }: AlbumItemProps) {
  return (
    <AlbumItemWrapper>
      <AlbumItemLeft>
        <AlbumItemTimeline>
          <Divider style={{ margin: "0 0 4px" }} plain>
            4 月
          </Divider>
        </AlbumItemTimeline>
        <AlbumItemContent>
          <Image.PreviewGroup>
            <AlbumItemImage mode={mode}>
              {mode === "detail" && <AlbumItemDay>今天</AlbumItemDay>}
              <Image
                width={200}
                src="https://p3-passport.byteimg.com/img/user-avatar/3d99b843527461e48ee39069bcd52ece~180x180.awebp"
              ></Image>
            </AlbumItemImage>
            <AlbumItemImage>
              {mode === "detail" && <AlbumItemDay>昨天</AlbumItemDay>}
              <Image
                width={200}
                src="https://p3-passport.byteimg.com/img/user-avatar/3d99b843527461e48ee39069bcd52ece~180x180.awebp"
              ></Image>

              <Image
                width={200}
                src="https://p3-passport.byteimg.com/img/user-avatar/3d99b843527461e48ee39069bcd52ece~180x180.awebp"
              ></Image>
            </AlbumItemImage>
            <AlbumItemImage mode={mode}>
              {mode === "detail" && <AlbumItemDay>前天</AlbumItemDay>}
              <Image
                width={200}
                src="https://p3-passport.byteimg.com/img/user-avatar/3d99b843527461e48ee39069bcd52ece~180x180.awebp"
              ></Image>
            </AlbumItemImage>
          </Image.PreviewGroup>
        </AlbumItemContent>
      </AlbumItemLeft>
    </AlbumItemWrapper>
  );
}
