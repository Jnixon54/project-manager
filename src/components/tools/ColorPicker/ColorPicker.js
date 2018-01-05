import React from 'react';
import './ColorPicker.css'

const colorsList = [["red", "yellow", "blue"], ["green", "gold", "purple"], ["chartreuse", "lightskyblue", "turquoise"]]


    const ColorPicker = (props) => (
        <div>
          <div className="color-picker" onClick={() => props.showColors(props.currentProject.id)} ></div>
          {props.colorsOpen && props.projID === props.currentProject.id && 
            <div className="color-box"> 
               {colorsList.map((currColor, index) => {
                 return (
                    <div key={index} className="color-holder">
                       <div className="colors-to-pick" style={{'backgroundColor': `${currColor[0]}`}} 
                            onClick={() => props.pickColor(`${currColor[0]}`, props.currentProject.id)}></div>
                        <div className="colors-to-pick" style={{'backgroundColor': `${currColor[1]}`}} 
                             onClick={() => props.pickColor(`${currColor[1]}`, props.currentProject.id)}></div>
                        <div className="colors-to-pick" style={{'backgroundColor': `${currColor[2]}`}} 
                             onClick={() => props.pickColor(`${currColor[2]}`, props.currentProject.id)}></div>
                    </div>
                       )})}
            </div>
          }
        </div>
        )
export default ColorPicker;
