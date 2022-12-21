import  React ,{useState} from "react";
import { View } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

function DropdownComponent() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
    {label: 's', value: 's'},
    {label: 'q', value: 'q'},
    {label: 'f', value: 'f'},
    {label: 'g', value: 'g'},
    {label: 'p', value: 'p'},
    {label: 'a', value: 'a'}
  ]);

  const select=()=>{
    console.log('value',value)
  }

  return (
   <View style={{
    
   
    paddingHorizontal: 30
  }}
   >
     <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      onChangeValue={select}
      theme="LIGHT"
      
     
    />
   </View>
  );
}

export default DropdownComponent