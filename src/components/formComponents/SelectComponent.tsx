import React, { Component } from 'react'

import ReactSelect from 'react-select';
import { ValidationsType } from './InputComponent';

export interface ISelectOptionType {
    value: string;
    label: string;
}

export interface ISelectProps {
    options: ISelectOptionType[];
    selectedOptionCallback: (selectedoption: ISelectOptionType) => void;
    label: string;
    validatefor?: ValidationsType;
    customClass?: string;
    defaultValue?: string | number | null;
    customContainerClass? : string
}

export default class SelectComponent extends Component<ISelectProps> {

    state = {
        selectedOptionObj: { value: "", label: "" }
    }

    handleSelection(selectedOption: any) {
        this.props.selectedOptionCallback(selectedOption)
    }

    setValue(defaultValue: string | number, options: ISelectOptionType[]) {

        let arrayIndex = options.findIndex(function (element: any) {
            return element.value === defaultValue;
        });

        return arrayIndex;
    }

    render() {
        return (
            <div className={`m-2 ${this.props.customContainerClass ? this.props.customContainerClass : ""}`}>
                <div className="inputLabel">
                    {this.props.label}<span className="text-danger">{this.props.validatefor === ValidationsType.COMPULSORY ? "*" : ""}</span>
                </div>
                <div>
                    <ReactSelect className={`${this.props.customClass ? this.props.customClass : ""}`} options={this.props.options}
                        onChange={(e) => {
                            this.handleSelection(e)
                        }}
                        value={this.props.options[this.setValue(this.props.defaultValue!, this.props.options)]}
                    />
                </div>
            </div>
        )
    }
}