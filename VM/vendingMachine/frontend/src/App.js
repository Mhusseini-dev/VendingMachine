import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

function App() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  const [paymentMethod, setPaymentMethod]=useState([])
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [chosenItem, setChosenItem]=useState([]);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const [change, setChange] = useState('');
  const [coins, setCoins] = useState([])
  const [alert, setAlert]= useState('none')
  const [item, setItem] = useState([]);
  const [badAlert, setBadAlert] = useState('none')
  const [value, setValue] = useState([]);
  let trueVal = value.join("");
  let keypad = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0];
  const URL = "http://localhost:8000/items/get";
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios.get(URL).then((response) => {
      setItems(response.data);
    });
  }, []);

  const getItem = async () =>{
    axios.get(`http://localhost:8000/items/get/${trueVal}`)
    .then(res=> {
    setChosenItem(res.data)})
  }

  const makePurchase = async (e) => {
    e.preventDefault();
    const data = {
      payment: coins,
    }
    await axios.patch(`http://localhost:8000/items/purchase/${trueVal}`, data)
    .then((res) => {
      console.log(res)
      setAlert('inline-block')
      setChange(coins - chosenItem.item_price);
    setTimeout(()=>{
      window.location.reload();
    },9000)
    }).catch((error) => {
      setTimeout(()=>{
        window.location.reload();
      },4000)
    console.log('ffff',error);
    setBadAlert('block')})
  }

  return (
    <div className="App">
      <Grid container justifyContent={"center"}>
        <Paper
          elevation={3}
          style={{ backgroundColor: "black", width: "500px", height: "1000px" }}
        >
          <Box sx={{ width: "100%" }}>
            <br></br>
            <Typography style={{ color: "#9c27b0" }}>
              The Wonderous E-Vending Machine
            </Typography>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              style={{ marginTop: "50px" }}
            >
              {items.map((items) => {
                return (
                  <Grid item xs={6}>
                    <Box style={{ color: "white" }}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        style={{ width: "100px" }}
                      >
                        {items.item_name}
                        <br></br>ID:{items.id}
                        <br></br>Quantity: {items.item_quantity}
                      </Button>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
            <Box>
              <br></br>
              <input
                type="text"
                value={`${value == "" ? "Please Enter an ID" : trueVal}`}
              ></input>
            </Box>
            <br></br>
            <Grid container justifyContent={"center"}>
              <Box style={{ width: "200px" }}>
                {keypad.map((number) => {
                  return (
                    <Button
                      variant="outlined"
                      color="secondary"
                      id={number}
                      onClick={(prev) => {
                        setValue((prev) => [...prev, number]);
                      }}
                    >
                      {number}
                    </Button>
                  );
                })}
                <br></br>
                <br></br>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={()=> {handleOpen(); getItem()}}
                >
                  Select Payment Method
                </Button>
              </Box>
              <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
              >
                <Box sx={{ ...style, width: 200 }}>
                  You've Chose {chosenItem.item_name || item.item_name}, price is {chosenItem.item_price || item.item_price}
                  <h2 id="child-modal-title">Choose Payment Method</h2>
                  <ul>
                    Coins:<input type="checkbox" onClick={()=>setPaymentMethod(1)}></input>
                    <br></br>
                    Cards:<input type="checkbox" onClick={()=>setPaymentMethod(2)}></input>
                    <br></br>
                    Notes, only accepts $20, $50 bills
                    <input type="checkbox" onClick={()=>setPaymentMethod(3)}></input>
                  </ul>
                  <Button onClick={()=> {handleClose(); handleOpenDialog();}} variant="outlined">
                    Proceed
                  </Button>
                </Box>
              </Modal>
              <Modal
              hideBackdrop
              open={openDialog}
              onClose={handleCloseDialog}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
              >
                  <Box sx={{ ...style, width: 200 }}>
{paymentMethod == 1 ?
                  <h1>Please Insert the coins<input type="text" onChange={(e)=>setCoins(e.target.value)} value={coins}></input>
                  <Button onClick={(e)=>{makePurchase(e)}}>Purchase!</Button>
                  </h1>:
                  paymentMethod == 2 ?<h1>Please swipe your card<input type="text"></input>
                  <Button onClick={(e)=>{makePurchase(e)}}>Purchase!</Button></h1>
                  :
                  
                  <h1>Please Insert your bills<input type="text" onChange={(e)=>setCoins(e.target.value)}></input>
                  <Button onClick={(e)=>{makePurchase(e);}}>Purchase!</Button></h1>
                } <Button onClick={()=> {handleCloseDialog()}} variant="outlined">
                  
                    Close!
                  </Button>
                  <Box style={{display: alert}}><h1>Purchase Complete, thank you!</h1></Box>
                  <Box style={{display: badAlert}}><h1>Purchase Failed.</h1></Box>
                  <Box><h1>Heres your change {change}</h1></Box>
                </Box>
              </Modal>
            </Grid>
          </Box>
        </Paper>
      </Grid>
    </div>
  );
}

export default App;
