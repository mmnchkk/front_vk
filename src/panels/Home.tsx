import { FC, useState, useEffect } from "react";
import {
  Panel,
  Button,
  Div,
  Title,
  Slider,
  Input,
  Checkbox,
  FormItem,
  Select,
  Card,
  CardGrid,
} from "@vkontakte/vkui";
import { lightFormat } from "date-fns";
import { Icon16CalendarOutline } from "@vkontakte/icons";
import { fetchEmotions } from "../service/emotionService"; // Импортируем addEmotionFx
import "./style.css";
import { addEmotionFx } from "../store/emotionsStore";

export interface HomeProps {
  id: string;
}

export const Home: FC<HomeProps> = ({ id }) => {
  const emojis = ["😭", "😢", "😔", "😶", "🙂", "😊", "😁"];
  const [sliderValue, setSliderValue] = useState(50);
  const [value, setValue] = useState(() => new Date());
  const [selectedReason, setSelectedReason] = useState("Отношения");
  const [notes, setNotes] = useState("");
  const [feelings, setFeelings] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [emotions, setEmotions] = useState<any[]>([]); // Состояние для хранения эмоций

  // Загрузка эмоций при монтировании компонента
  useEffect(() => {
    const loadEmotions = async () => {
      const fetchedEmotions = await fetchEmotions();
      setEmotions(fetchedEmotions);
    };
    loadEmotions();
  }, []);

  const getEmojiIndex = (value: number) => {
    const maxIndex = emojis.length - 1;
    const index = Math.round((value / 100) * maxIndex);
    return Math.min(Math.max(index, 0), maxIndex);
  };
  const [currentView, setCurrentView] = useState<any>(1);
  const handleNextClick = (view: any) => {
    setCurrentView(view); // Показываем форму
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const mood = emojis[getEmojiIndex(sliderValue)];
      await addEmotionFx({
        mood,
        reason: selectedReason,
        notes,
        feelings: feelings.join(", "),
        date: new Date(), // Передаем текущую дату и время
      });
    } catch (error) {
      console.error("Ошибка при отправке данных", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Panel id={id}>
      <Div className="home-wrap">
        <Div className="home">
          <Title className="home-date">
            <Icon16CalendarOutline />
            Сегодня {lightFormat(value, "dd.MM.yyyy, HH:mm")}
          </Title>

          {currentView === 1 && (
            <div className="first-part">
              <Title className="title" style={{textAlign: "center"}}>Как вы себя чувствуете?</Title>
              <Title className="home-emoji" style={{ fontSize: 100 }}>
                {emojis[getEmojiIndex(sliderValue)]}
              </Title>
              <Slider
                value={sliderValue}
                onChange={(val: number) => setSliderValue(val)}
                min={0}
                max={100}
                step={1}
                className="slider"
              />
              <Button
                stretched
                size="l"
                mode="outline"
                onClick={() => {
                  handleNextClick(2);
                }}
              >
                Далее
              </Button>
            </div>
          )}
          {currentView === 2 && (
            // Вторая часть: форма с выбором причины, заметками и чувствами
            <div className="second-part">
              <CardGrid size="l" spaced>
                <Card mode="shadow">
                  <FormItem
                    top="Что повлияло на ваше настроение?"
                    htmlFor="reason-select"
                  >
                    <Select
                      id="reason-select"
                      value={selectedReason}
                      onChange={(e) => setSelectedReason(e.target.value)}
                      options={[
                        { label: "Отношения", value: "Отношения" },
                        { label: "Учеба", value: "Учеба" },
                        { label: "Друзья", value: "Друзья" },
                        { label: "Работа", value: "Работа" },
                        { label: "Семья", value: "Семья" },
                        { label: "Погода", value: "Погода" },
                        { label: "Хобби", value: "Хобби" },
                        { label: "Уборка", value: "Уборка" },
                        { label: "Досуг", value: "Досуг" },
                        { label: "Все бесит", value: "Все бесит" },
                      ]}
                    />
                  </FormItem>
                  <FormItem top="Заметки" htmlFor="notes-input">
                    <Input
                      id="notes-input"
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </FormItem>
                  <FormItem top="Какими словами можно описать ваши чувства?">
                    <div className="feelings">
                      <div>
                        <Checkbox
                          onChange={() => {
                            const index = feelings.indexOf("Тревога");
                            if (index > -1) {
                              setFeelings((prev) => prev.slice(0, index).concat(prev.slice(index + 1)));
                            } else {
                              setFeelings((prev) => [...prev, "Тревога"]);
                            }
                          }}
                        >
                          Тревога
                        </Checkbox>
                        <Checkbox
                          onChange={() => {
                            const index = feelings.indexOf("Счастье");
                            if (index > -1) {
                              setFeelings((prev) => prev.slice(0, index).concat(prev.slice(index + 1)));
                            } else {
                              setFeelings((prev) => [...prev, "Счастье"]);
                            }
                          }}
                        >
                          Счастье
                        </Checkbox>
                        <Checkbox
                          onChange={() => {
                            const index = feelings.indexOf("Агрессия");
                            if (index > -1) {
                              setFeelings((prev) => prev.slice(0, index).concat(prev.slice(index + 1)));
                            } else {
                              setFeelings((prev) => [...prev, "Агрессия"]);
                            }
                          }}
                        >
                          Агрессия
                        </Checkbox>
                        <Checkbox
                          onChange={() => {
                            const index = feelings.indexOf("Апатия");
                            if (index > -1) {
                              setFeelings((prev) => prev.slice(0, index).concat(prev.slice(index + 1)));
                            } else {
                              setFeelings((prev) => [...prev, "Апатия"]);
                            }
                          }}
                        >
                          Апатия
                        </Checkbox>
                      </div>
                      <div>
                        <Checkbox
                          onChange={() => {
                            const index = feelings.indexOf("Умиротворение");
                            if (index > -1) {
                              setFeelings((prev) => prev.slice(0, index).concat(prev.slice(index + 1)));
                            } else {
                              setFeelings((prev) => [...prev, "Умиротворение"]);
                            }
                          }}
                        >
                          Умиротворение
                        </Checkbox>
                        <Checkbox
                          onChange={() => {
                            const index = feelings.indexOf("Депрессия");
                            if (index > -1) {
                              setFeelings((prev) => prev.slice(0, index).concat(prev.slice(index + 1)));
                            } else {
                              setFeelings((prev) => [...prev, "Депрессия"]);
                            }
                          }}
                        >
                          Депрессия
                        </Checkbox>
                        <Checkbox
                          onChange={() => {
                            const index = feelings.indexOf("Кайф");
                            if (index > -1) {
                              setFeelings((prev) => prev.slice(0, index).concat(prev.slice(index + 1)));
                            } else {
                              setFeelings((prev) => [...prev, "Кайф"]);
                            }
                          }}
                        >
                          Кайф
                        </Checkbox>
                        <Checkbox
                          onChange={() => {
                            const index = feelings.indexOf("Эйфория");
                            if (index > -1) {
                              setFeelings((prev) => prev.slice(0, index).concat(prev.slice(index + 1)));
                            } else {
                              setFeelings((prev) => [...prev, "Эйфория"]);
                            }
                          }}
                        >
                          Эйфория
                        </Checkbox>
                      </div>
                    </div>
                  </FormItem>
                  <Button
                    stretched
                    size="l"
                    mode="outline"
                    onClick={() => {
                      handleSubmit(), handleNextClick(3);
                    }}
                    loading={isLoading}
                    style={{ margin: 20, width: 300 }}
                  >
                    Подтвердить
                  </Button>
                </Card>
              </CardGrid>
            </div>
          )}
          {currentView === 3 && (
            <div className="first-part">
              <Title className="title-3" style={{textAlign: "center"}}>
                Спасибо, что поделились своими эмоцями!
              </Title>
              <p className="desc-3">Можете посмотреть записи в календаре.</p>
              <Button
                stretched
                size="l"
                mode="outline"
                onClick={() => {
                  handleNextClick(1);
                }}
              >
                На главную
              </Button>
            </div>
          )}
        </Div>
      </Div>
    </Panel>
  );
};
