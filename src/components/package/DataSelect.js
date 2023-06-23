import React, { useState, useMemo } from "react";
import { FixedSizeList as List } from "react-window";
import { components } from "react-select";
import Select from "react-select";

const LazySelect = ({ options, defaultSearch }) => {
    const [search, setSearch] = useState("");

    const filteredOptions = useMemo(() => {
        if (!search) return options;
        return options.filter((option) =>
            option.label.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, options]);

    const handleInputChange = (newValue) => {
        setSearch(newValue);
    };

    const VirtualizedMenuList = ({ children, getValue }) => {
        const [value] = getValue();
        const initialOffset = filteredOptions.findIndex(
            (option) => option.value === value
        );
        const itemSize = 35;
        const initialScrollOffset = initialOffset * itemSize; // Assuming each option has a height of 35px
        const height = filteredOptions.length * itemSize;
        return (
            <List
                height={height}
                itemCount={filteredOptions.length}
                itemSize={itemSize}
                initialScrollOffset={initialScrollOffset}
            >
                {({ index, style }) => (
                    <div style={style}>{children({ index, style })}</div>
                )}
            </List>
        );
    };

    const CustomMenuList = (props) => {
        const { children, maxHeight} = props;

        return (
            <components.MenuList {...props}>
                <VirtualizedMenuList maxHeight={maxHeight} {...props}>
                    {({ index }) => children[index]}
                </VirtualizedMenuList>
            </components.MenuList>
        );
    };

    return (
        <Select
            options={filteredOptions}
            onInputChange={handleInputChange}
            components={{ MenuList: CustomMenuList }}
            defaultValue={defaultSearch || 'Select'}

            styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: state.isFocused ? 'grey' : 'blue'
                }),
                container: (baseStyles) => ({
                    ...baseStyles,
                    width: '200px'
                }),
                menu : (baseStyles) => ({
                    ...baseStyles,
                    marginTop: '0'
                })
            }}
            className="react-select-container"
            classNamePrefix="react-select"
        />
    );
};

export default LazySelect;