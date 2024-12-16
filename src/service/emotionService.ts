export const fetchEmotions = async () => {
  try {
    const response = await fetch("http://localhost:3000/emotions");
    if (!response.ok) {
      throw new Error("Failed to fetch emotions");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const addEmotion = async (
  mood: string,
  reason: string,
  notes: string,
  feelings: string,
  date: Date
) => {
  try {
    const response = await fetch("http://localhost:3000/emotions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mood,
        reason,
        notes,
        feelings,
        date,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error posting data:", error);
  }
};
