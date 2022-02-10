import produce, { Draft } from "immer";
import React, { useReducer } from "react";

export type InputDropDownItemType = {
    id: string
    content: string
    // value: T
    //  [key: string]: any;
}

export interface DefaultInputDropDownItemType<T extends any = string> extends InputDropDownItemType {
    value: T
}


export type InputFieldState<T extends InputDropDownItemType> = {
    value: string
    values: T[]
    dropDownItems: T[]
    open: boolean
    error?: string
    selectedDropDownItemId?: string
}

export enum InputFieldActions {
    SetSingleValue,
    SetDropDownItems,
    AddDropDownItems,
    SelectUnSelectMulti,
    SelectSingleValue,
    OpenClose,
    Close,
    Open,
    SetError,
    SetValues
}

const startState: InputFieldState<any> = {
    values: [],
    value: "",
    dropDownItems: [],
    open: false,
}

export type DropDownType<T> = { id: string, content: string, selected?: boolean } & T;
export type InputDispatchType<T extends InputDropDownItemType = DefaultInputDropDownItemType> = React.Dispatch<InputFieldActionType<T>>;

export type InputFieldActionType<T> = { type: InputFieldActions, params?: any & InputFieldState<DefaultInputDropDownItemType<T>> }
export const useInputFieldReducer = <T extends InputDropDownItemType = DefaultInputDropDownItemType>(initialState?: Partial<InputFieldState<T>>) => useReducer<React.Reducer<InputFieldState<T>, InputFieldActionType<T>>>(InputFieldReducer, { ...startState, ...initialState });

const InputFieldReducer = <Z extends any, T extends InputDropDownItemType = DefaultInputDropDownItemType<Z>>(currentState: InputFieldState<T>, action: InputFieldActionType<T>): InputFieldState<T> => {
    switch (action.type) {
        case InputFieldActions.SelectSingleValue:
            return selectSingleValue(currentState, action.params.value);
        case InputFieldActions.SetSingleValue:
            return setSingleValue(currentState, action.params.value); //   return { ...currentState, value: action.params.value, selectedDropDownItemId: action.params.selectedDropDownItemId }
        case InputFieldActions.SetDropDownItems:
            return setDropDownItems(currentState, action.params.items);
        case InputFieldActions.AddDropDownItems:
            return addDropDownItems(currentState, action.params.items); // { ...currentState, dropDownItems: [...currentState.dropDownItems, action.params.dropDownItems] }
        case InputFieldActions.OpenClose:
            return setOpenClose(currentState);
        case InputFieldActions.Close:
            return setOpen(currentState, false);
        case InputFieldActions.Open:
            return setOpen(currentState, true);
        case InputFieldActions.SelectUnSelectMulti:
            return selectUnSelectMulti(currentState, action.params.value, action.params.max);
        case InputFieldActions.SetValues:
            return setValues(currentState, action.params.values);
        case InputFieldActions.SetError:
            return setError(currentState, action.params.error);
        default:
            throw new Error("Invalid dispatch action");
    }
}

const setError = <Z extends any = string, T extends InputDropDownItemType = DefaultInputDropDownItemType<Z>>(currentState: InputFieldState<T>, error: string): InputFieldState<T> =>
    produce(currentState, newState => {
        newState.error = error;
    })


const selectUnSelectMulti = <Z extends any = string, T extends InputDropDownItemType = DefaultInputDropDownItemType<Z>>(currentState: InputFieldState<T>, value: T, max?: number): InputFieldState<T> =>
    produce(currentState, newState => {
        const index = newState.values.findIndex(i => i.id === value.id);
        if (index > -1) newState.values.splice(index, 1);// newState.values[index] = value as Draft<T>;
        else {
            if (max === undefined) newState.values.push(value as Draft<T>);
            else {
                // alert("test");
                if (newState.values.length < max) newState.values.push(value as Draft<T>);
            }
        }
    })

const selectSingleValue = <Z extends any = string, T extends InputDropDownItemType = DefaultInputDropDownItemType<Z>>(currentState: InputFieldState<T>, value: T): InputFieldState<T> =>
    produce(currentState, newState => {
        newState.values = [value as Draft<T>]
    })

const setValues = <Z extends any = string, T extends InputDropDownItemType = DefaultInputDropDownItemType<Z>>(currentState: InputFieldState<T>, values: T[]): InputFieldState<T> =>
    produce(currentState, newState => {
        newState.values = values as Draft<T>[]
    })


const setSingleValue = <Z extends any = string, T extends InputDropDownItemType = DefaultInputDropDownItemType<Z>>(currentState: InputFieldState<T>, value: string): InputFieldState<T> =>
    produce(currentState, newState => {
        newState.value = value;
    })

const addDropDownItems = <Z extends any = string, T extends InputDropDownItemType = DefaultInputDropDownItemType<Z>>(currentState: InputFieldState<T>, items: T[]): InputFieldState<T> =>
    produce(currentState, newState => {
        const i = items as Draft<T>[];
        newState.dropDownItems.push(...i);
    })

const setDropDownItems = <Z extends any = string, T extends InputDropDownItemType = DefaultInputDropDownItemType<Z>>(currentState: InputFieldState<T>, items: T[]): InputFieldState<T> =>
    produce(currentState, newState => {
        const i = items as Draft<T>[];
        newState.dropDownItems = i;
    })

const setOpen = <Z extends any = string, T extends InputDropDownItemType = DefaultInputDropDownItemType<Z>>(currentState: InputFieldState<T>, open: boolean): InputFieldState<T> =>
    produce(currentState, newState => {
        newState.open = open;
    })

const setOpenClose = <Z extends any = string, T extends InputDropDownItemType = DefaultInputDropDownItemType<Z>>(currentState: InputFieldState<T>): InputFieldState<T> =>
    produce(currentState, newState => {
        newState.open = !newState.open;
    })



export const inputSetValues = <Z extends any = string, T extends InputDropDownItemType = DefaultInputDropDownItemType<Z>>(values: T[], dispatch: React.Dispatch<{
    type: InputFieldActions;
    params?: any;
}>) => {
    dispatch({ type: InputFieldActions.SetValues, params: { values: values } });
}

export const inputSetDropDownItems = <Z extends any = string, T extends InputDropDownItemType = DefaultInputDropDownItemType<Z>>(items: T[], dispatch: React.Dispatch<{
    type: InputFieldActions;
    params?: any;
}>) => {
    dispatch({ type: InputFieldActions.SetDropDownItems, params: { items: items } });
}

export const onInputSingleChange = <Z extends any = string, T extends InputDropDownItemType = DefaultInputDropDownItemType<Z>>(value: string, dispatch: React.Dispatch<{
    type: InputFieldActions;
    params?: any;
}>) => dispatch({ type: InputFieldActions.SetSingleValue, params: { value: value } });

export const inputChange = onInputSingleChange;

export const onInputMultiChange = <Z extends any = string, T extends InputDropDownItemType = DefaultInputDropDownItemType<Z>>(value: T, max: number | undefined, dispatch: React.Dispatch<{
    type: InputFieldActions;
    params?: any;
}>) => dispatch({ type: InputFieldActions.SelectUnSelectMulti, params: { value: value, max: max } });

export const onInputSelectSingleValue = <Z extends any = string, T extends InputDropDownItemType = DefaultInputDropDownItemType<Z>>(value: T, dispatch: React.Dispatch<{
    type: InputFieldActions;
    params?: any;
}>, func?: () => void) => {
    func?.();
    dispatch({ type: InputFieldActions.SelectSingleValue, params: { value: value } });
}

export const inputSetError = (error: string | undefined, dispatch: React.Dispatch<{
    type: InputFieldActions;
    params?: any;
}>) => dispatch({ type: InputFieldActions.SetError, params: { error: error } });


export const onInputClose = (dispatch: React.Dispatch<{
    type: InputFieldActions;
    params?: any;
}>) => dispatch({ type: InputFieldActions.Close });

export const onInputOpen = (dispatch: React.Dispatch<{
    type: InputFieldActions;
    params?: any;
}>) => dispatch({ type: InputFieldActions.Open });

export const onInputOpenClose = (dispatch: React.Dispatch<{
    type: InputFieldActions;
    params?: any;
}>) => dispatch({ type: InputFieldActions.OpenClose });


/*

export const onInputItemSingleClick = <T extends any = string>(value: DropDownType<T>, dispatch: React.Dispatch<{
    type: InputFieldActions;
    params?: any;
}>, func?: () => void) => {

    func?.();
    dispatch({ type: InputFieldActions.SetSingleValue, params: { value: value } });
}

export const onInputDropDownItemClick = <T extends any = string>(value: DropDownType<T>, fieldName: keyof DropDownType<T> | null, dispatch: React.Dispatch<{
    type: InputFieldActions;
    params?: any;
}>, func?: () => void) => {
    console.log("click");
    func?.();
    if (fieldName === null) dispatch({ type: InputFieldActions.SetValue, params: { value: value } });
    else dispatch({ type: InputFieldActions.SetValue, params: { value: value[fieldName], selectedDropDownItemId: value.id } });


    dispatch({ type: InputFieldActions.Close });
}
*/


export default InputFieldReducer;