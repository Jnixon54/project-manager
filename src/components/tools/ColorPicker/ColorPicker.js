import React from 'react';
import './ColorPicker.css'

const colorsList = [["red", "yellow", "blue"], ["green", "gold", "purple"], ["rgb(144, 148, 159)", "lightskyblue", "turquoise"]]


    const ColorPicker = (props) => (
        <div>
          <div className="color-picker" onClick={() => props.showColors(props.currentItem.id)} >
            <div class="menu-dot"></div>
            <div class="menu-dot"></div>
            <div class="menu-dot"></div>
          </div>
          {props.colorsOpen && props.currentID === props.currentItem.id && 
            <div className="color-box"> 
               {colorsList.map((currColor, index) => {
                 return (
                    <div key={index} className="color-holder">
                       <div className="colors-to-pick" style={{'backgroundColor': `${currColor[0]}`}} 
                            onClick={() => props.pickColor(`${currColor[0]}`, props.currentItem.id)}></div>
                        <div className="colors-to-pick" style={{'backgroundColor': `${currColor[1]}`}} 
                             onClick={() => props.pickColor(`${currColor[1]}`, props.currentItem.id)}></div>
                        <div className="colors-to-pick" style={{'backgroundColor': `${currColor[2]}`}} 
                             onClick={() => props.pickColor(`${currColor[2]}`, props.currentItem.id)}></div>
                    </div>
                       )})}
            </div>
          }
        </div>
        )
export default ColorPicker;
