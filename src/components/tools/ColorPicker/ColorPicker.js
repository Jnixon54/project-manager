import React from 'react';
import './ColorPicker.css'


    const ColorPicker = (props) => (
        <div>
        {console.log(props)}
          <div className="color-picker" onClick={() => props.showColors(props.currentProject.id)}></div>
          {props.colorsOpen && props.projID === props.currentProject.id && 
          <div className="color-box"> 
          <div className="color-holder">
          <div className="colors-to-pick color-1" onClick={() => props.pickColor("red", props.currentProject.id)}></div>
          <div className="colors-to-pick color-2" onClick={() => props.pickColor("yellow", props.currentProject.id)}></div>
          <div className="colors-to-pick color-3" onClick={() => props.pickColor("blue", props.currentProject.id)}></div>
          </div>
          <div className="color-holder">
          <div className="colors-to-pick color-4" onClick={() => props.pickColor("green", props.currentProject.id)}></div>
          <div className="colors-to-pick color-5" onClick={() => props.pickColor("gold", props.currentProject.id)}> </div>
          <div className="colors-to-pick color-6" onClick={() => props.pickColor("purple", props.currentProject.id)}></div>
          </div>
          <div className="color-holder">
          <div className="colors-to-pick color-7" onClick={() => props.pickColor("chartreuse", props.currentProject.id)}></div>
          <div className="colors-to-pick color-8" onClick={() => props.pickColor("lightskyblue", props.currentProject.id)}></div>
          <div className="colors-to-pick color-9" onClick={() => props.pickColor("turquoise", props.currentProject.id)}></div>
          </div>
          </div>
          
          
          }
        </div>
      )
export default ColorPicker;
