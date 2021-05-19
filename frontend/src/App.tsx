import Footer from 'components/Footer';
import InputArea from 'components/InputArea';
import LineChart from 'components/LineChart';
import NavBar from 'components/NavBar';
import React, { useState } from 'react';

function App() {

  let data = "";

  const [chartData, setChartData] = useState<string>("");

  // This function sends the text to the Chart component when the button on the footer is pressed.
  const callbackFunction = () => {
    setChartData(data);
  };

  const getDataInputText = (e: string) => {
    data = e;
  }

  return (
    <>
      <NavBar />
      <InputArea parentCallback={getDataInputText} />
      <LineChart data={chartData} />
      <Footer parentCallback={callbackFunction} />
    </>
  );
}

export default App;