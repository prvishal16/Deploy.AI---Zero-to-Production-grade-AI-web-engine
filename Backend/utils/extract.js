//here i am going to cleaning thhe importaint thing

const Extractjson = async (text) => {
  try {
    //here i am going to extracting the json
    if (!text) {
      return;
    }
    const cleaned = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const firstBraces = cleaned.indexOf("{");
    const secondBraces = cleaned.lastIndexOf("}");

    if (firstBraces === -1 || secondBraces === -1) return null;

    const jsonString = cleaned.slice(firstBraces, secondBraces + 1);
    return JSON.parse(jsonString);
  } catch (error) {}
};

export default Extractjson;
