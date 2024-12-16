import { FC, useState, useEffect } from "react";
import {
  Panel,
  Title,
  Button,
  Card,
  CardGrid,
  Placeholder,
} from "@vkontakte/vkui";
import { Emotion } from "../types/emotions";
import { Icon36Delete } from "@vkontakte/icons"; // Импорт иконки для кнопки удаления
import "./style.css";

interface CalendarProps {
  id: string;
}

export const Calendar: FC<CalendarProps> = ({ id }) => {
  const [emotions, setEmotions] = useState<Emotion[]>([]);

  // Запрос на получение эмоций
  const fetchEmotions = async () => {
    try {
      const response = await fetch("http://localhost:3000/emotions");
      if (!response.ok) {
        throw new Error("Failed to fetch emotions");
      }
      const data = await response.json();
      setEmotions(data);
    } catch (error) {
      console.error("Error fetching emotions:", error);
    }
  };

  useEffect(() => {
    fetchEmotions();
  }, []);

  // Функция удаления эмоции
  const handleDeleteEmotion = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/emotions/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setEmotions(emotions.filter((emotion: any) => emotion.id !== id)); // Обновляем список
      } else {
        console.error("Error deleting emotion");
      }
    } catch (error) {
      console.error("Error deleting emotion:", error);
    }
  };

  return (
    <Panel id={id}>
      <Placeholder className="calendar">
        <CardGrid size="l">
          {emotions.length === 0 ? (
            <p>Нет данных о настроении</p>
          ) : (
            <div className="maps">
              {emotions.map((emotion) => (
                <Card
                  key={emotion.id}
                  style={{ height: "100%" }}
                  className="card"
                >
                  <Title className="emotion-smile">{emotion.mood}</Title>
                  <div className="card-info">
                    <p
                      style={{
                        color: "black",
                        fontSize: 20,
                        fontWeight: 500,
                        textAlign: "start",
                      }}
                    >
                      {emotion.feelings}
                    </p>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 500, maxWidth: 300, textAlign: "start" }}>
                        Причина:{" "}
                        <span style={{ fontWeight: 400 }}>
                          {emotion.reason}
                        </span>
                      </p>
                      <p style={{ fontSize: 14, fontWeight: 500, maxWidth: 250, textAlign: "start" }}>
                        Заметки:{" "}
                        <span style={{ fontWeight: 400 }}>{emotion.notes}</span>
                      </p>
                      <p style={{ fontSize: 14, fontWeight: 500, maxWidth: 300, textAlign: "start" }}>
                        Дата:{" "}
                        <span style={{ fontWeight: 400 }}>
                          {new Date(emotion.date).toLocaleString()}
                        </span>
                      </p>
                    </div>
                  </div>
                  <Button
                    size="m"
                    mode="link"
                    onClick={() => handleDeleteEmotion(Number(emotion.id))}
                    before={<Icon36Delete color="black" />}
                    style={{ position: "absolute", bottom: 10, right: 10 }}
                  >
                    
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </CardGrid>
      </Placeholder>
    </Panel>
  );
};
