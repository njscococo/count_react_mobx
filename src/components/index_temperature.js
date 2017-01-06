import React from 'react';
import ReactDOM from 'react-dom';

import { observer } from 'mobx-react';
import { observable, computed } from 'mobx';
import DevTools from 'mobx-react-devtools';

//定義要觀察的狀態
export default class Temperature extends React.Component{
    @observable unit = "C";
    @observable temperatureCel = 25;

    @computed get temperatureKelvin(){
        return this.temperatureCel * (9/5) *32;
    }

    @computed get temperatureFarh(){
        return this.temperatureCel + 273.15;
    }

    @computed get temperature(){
        switch(this.unit){
            case 'C': return this.temperatureCel + 'C'
            case 'K': return this.temperatureKelvin+ 'K'
            case 'F': return this.temperatureFarh+ 'F'
        }
    }

    render(){
        return (
            <div>
                {this.temperature}
            </div>
        );
    }
    
}