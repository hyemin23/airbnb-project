import Button from "@/components/common/Button";
import Counter from "@/components/common/Counter";
import Selector from "@/components/common/Selector";
import { bedTypes } from "@/lib/staticData";
import { registerRoomAction } from "@/store/registerRoom";
import { BedType } from "@/types/room";
import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import palette from "styles/palette";

const Container = styled.div`
  width: 100%;
  padding: 28px 0;
  border-top: 1px solid ${palette.gray_dd};

  &:last-child {
    border-bottom: 1px solid ${palette.gray_dd};
  }

  .register-room-bed-type-counters {
    width: 320px;
    margin-top: 18px;
  }

  .register-room-bed-type-counter {
    width: 290px;
    margin-bottom: 18px;
  }
`;

interface IProps {
  bedroom: {
    id: number;
    beds: {
      type: BedType;
      count: number;
    }[];
  };
}
// 침대 추가를 열고 닫는 컴포넌트
const RegisterRoomBedTypes: React.FC<IProps> = ({ bedroom }) => {
  const dispatch = useDispatch();
  const [opened, setOpend] = useState(false);
  // * page 새로고침시에도 activeBedOptions 유지
  const initialBedOptions = bedroom.beds.map((bed) => bed.type);

  //* 침대 개수 총합
  const totalBedsCount = useMemo(() => {
    let total = 0;
    bedroom.beds.forEach((bed) => {
      total += bed.count;
    });
    return total;
  }, [bedroom]);

  // * 침실 유형 열고 닫기
  const toggleOpened = () => setOpend((prev) => !prev);

  // * 선택된 침대 옵션들
  const [activedBedOptions, setActivedBedOptions] = useState<BedType[]>(initialBedOptions);

  // * 남은 침대 옵션들
  const lastBedOptions = useMemo(() => {
    //   선택되지 않은 옵션들 return
    return bedTypes.filter((bedType) => !activedBedOptions.includes(bedType));
  }, [activedBedOptions, bedroom]);

  // * 침대 종류 텍스트
  const bedsText = useMemo(() => {
    const texts = bedroom.beds.map((bed) => `${bed.type} ${bed.count}개`);
    return texts.join(",");
  }, [bedroom]);

  return (
    <Container>
      <div className="register-room-bed-type-top">
        <div className="register-room-bed-type-bedroom-texts">
          <p className="register-room-bed-type-bedroom">{bedroom.id}번침실</p>
          <p className="register-room-bed-type-bedroom-counts">
            침대{totalBedsCount}개<br /> {bedsText}
          </p>
        </div>
        <Button styleType="register" color="white" onClick={toggleOpened}>
          {opened && "완료"}
          {!opened && totalBedsCount === 0 ? "침대 추가하기" : "침대 수정하기"}
        </Button>
      </div>
      {opened && (
        <div className="register-room-bed-type-selector-wrapper">
          <Selector
            type="register"
            options={lastBedOptions}
            defaultValue="다른 침대 추가"
            value="다른 침대 추가"
            disabledOptions={["다른 침대 추가"]}
            useValidation={false}
            //   선택되는 option들 추가하기
            onChange={(e) => setActivedBedOptions([...activedBedOptions, e.target.value as BedType])}
          />
        </div>
      )}
      {/* 활성화된 침대 유형마다 카운터 */}
      {opened && (
        <div className="register-room-bed-type-counters">
          {activedBedOptions.map((type) => (
            <div className="register-room-bed-type-counter" key={type}>
              <Counter
                label={type}
                value={bedroom.beds.find((bed) => bed.type === type)?.count || 0}
                key={type}
                onChange={(value) =>
                  dispatch(
                    registerRoomAction.setBedTypeCount({
                      bedroomId: bedroom.id,
                      type,
                      count: value,
                    }),
                  )
                }
              />
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default RegisterRoomBedTypes;
