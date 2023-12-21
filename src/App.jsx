import { useState, useEffect } from "react";
import "./App.css";
import { Typography, Input, List, Card, Image, Space } from "antd";

function App() {
  const [searchedText, setSearchedText] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const[previewImage,setPreviewImage] = useState([])

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/search?q=${searchedText}`)
      .then((res) => res.json())
      .then((response) => {
        setLoading(false);
        setDataSource(response.products);
      });
  }, [searchedText]);

  return (
    <Space style={{padding:"0px 16px"}} direction="vertical">
      <Typography.Title
        style={{ textAlign: "center", fontFamily: "monospace" }}
      >
        Khayyam's Gallery
      </Typography.Title>

      <Input.Search
        style={{ maxWidth: 500, display: "flex", margin: "auto" }}
        onSearch={(value) => {
          setSearchedText(value);
        }}
      >

      </Input.Search>

      <Typography.Text>Showing results for:<Typography.Text strong>{searchedText || "All"}</Typography.Text></Typography.Text>

      <List
        grid={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }}
        loading={loading}
        dataSource={dataSource}
        renderItem={(item) => {
          return (
            <Card hoverable key={item.id} style={{ height: 300, margin: 12,overflow:"hidden" }}>
              <Image src={item.thumbnail} preview={{visible:false}} 
              onClick={()=>{
                setPreviewImage(item.images)
              }}
              >

              </Image>
            </Card>
          );
        }}
      >
        
      </List>

        {previewImage.length> 0 ? <Image.PreviewGroup preview={{visible:previewImage.length,onVisibleChange:(value)=>{
          if(!value){
            setPreviewImage([]);
          }
        }}}>
          {previewImage.map((image,index)=>{
            return <Image key={index} src={image}/>
          })}
        </Image.PreviewGroup> : null }


    </Space>
  );
}

export default App;
