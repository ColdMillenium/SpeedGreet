import styled ,{css} from 'styled-components';
import React, {useState, useRef, useEffect, Fragment} from 'react'

function applyStyles(props){
    if(props.styles){
        // console.log('adding some styles yo');
        return props.styles
    }else{
        return '';
    }
}
const Container = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 0px;
  left: 0px;
  display: flex;
  background-color: white;
  flex-flow: column wrap;
  overflow: auto; //makes sure it stretches to fit content.
  max-width: fit-content;
  gap: 3px;
  color: black;
  border: 1px solid #f2f2f2;
  border-radius: 5px;
  
  ${applyStyles}
`
const ClickMenuItem = styled.a`
        padding: 0 20px;
        width: 150px;
        cursor: pointer;
        text-align: left;
        &:hover{
            background-color: #f2f2f2;
        };
        ${applyStyles}
    `
function makeMenu(props){
    const items = props.items;
    if(items == null){
        return (<div>Empty Click Menu</div>)
    }
    // console.log(items);
    return <React.Fragment>
        {items.map((item, index) => (
            <ClickMenuItem 
                key={index} 
                onClick={ ()=>{ 
                    item.onClick(); //do function for item
                    props.close(); //close menu
                }}
                styles = {item.styles}
            >
                <p>{item.name}</p>
            </ClickMenuItem>
         ))}
        </React.Fragment>
}


export default function ClickMenu(props) {
    const styles = props.styles;
    const Menu = makeMenu(props);
    return (
        <Container styles={styles}>
          {Menu}
        </Container> 
    )
}


function useOutsideClick(ref, setOpen) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
        //   console.log("clicked outside");
          setOpen(false);
        }
        // console.log(ref);
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

const Content = styled.div`
  overflow: hidden;
  margin: 0.1rem;
  display: inline-block;
  
  ${applyStyles}
`
const Button = styled.button`
        padding: 15px 32px;
        cursor: pointer;
        text-align: center;
        background-color: #1b69f9;
        color: white;
        margin: 0px;
        border:none;
        font-size: 1em;
        max-width: fit-content;
        overflow:hidden;
        box-sizing: border-box;
        display: inline-block;
        white-space: nowrap;
        ${applyStyles}
`

export function DropDownButton(props){
  const items = props.items;
  const menuStyles = props.menuStyles;
  const buttonStyles = props.buttonStyles;
    return (
      <DropDownWrapper menuStyles={menuStyles} items={items} >
        <Button styles={buttonStyles}>{props.children}</Button>
      </DropDownWrapper>
    )
    
}

export function DropDownWrapper(props){
  const [open, setOpen] = useState(false);
  const [offset, setOffset] = useState('');

  const items = props.items; //array of objects with each possibly having name, styles, function 
  const menuStyles = props.menuStyles; //need to just write a string of css styles
  const wrapperRef = useRef(null);
  const margin = setMargin(); //need to specify # and unit;
  // console.log("margin: " + margin)
  useOutsideClick(wrapperRef, setOpen);
  function handleClick(e){
      // console.log(e);
      setOpen(true);
      setOffset(`
          ;top: ${e.pageY}px; 
          left: ${e.pageX}px;
      `);
      // console.log("clicked");
      e.preventDefault();
  }
  function setMargin(){
    if(props.margin != null){
      return `;margin: ${props.margin};`
    }else{
      return ''; //default
    }
  }
  function offsetMenuStyles(){
      if(menuStyles === null){
          return offset;
      }else{
          return menuStyles + offset;
      }
  }

  // console.log(offset);
  // console.log(open);
  // console.log(menuStyles + offset);
  if(!open){
       return (<Content styles={margin} ref={wrapperRef}>
                <Content onClick={handleClick}>{props.children}</Content>
              </Content>)
  }else{
      return (
          <Content ref={wrapperRef}>
              <Content onClick={handleClick}>{props.children}</Content>
              <ClickMenu styles={offsetMenuStyles}  items={items} close={()=>{setOpen(false)}}></ClickMenu>      
          </Content>)
  }

  
}

export function ClickMenuDemo(){
  function handleClick(){
    //   console.log("you clicked me!")
  }
  const itemStyles=`
    &:hover{
      background-color: #1f1e21;
    };
  `;
  const items = [
      {name: "call bobby"}, 
      {name: "run away from sarah"},
      {name: "run away from sarah", onClick: handleClick}
    ]
  const customItems = [
    {name: "call bobby", styles: itemStyles}, 
    {name: "run away from sarah", styles: itemStyles},
    {name: "run away from sarah", onClick: handleClick, styles: itemStyles}
  ]
  const customMenuStyles=`
    background-color: #2d2c30;
    color: white;
  `;
  return (
  <div>
    <DropDownButton items={items}>Default DropDownButton</DropDownButton>
    <DropDownWrapper items={items}><button>Default DropDownWrapper</button></DropDownWrapper> 
    <DropDownWrapper menuStyles = {customMenuStyles} items={customItems}><button>Cutom Dark DropDownWrapper</button></DropDownWrapper>

  </div>)
}