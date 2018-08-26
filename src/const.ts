import { IReactExcludeMethods } from "./IReactExcludeMethods";

export namespace Const {
    export const CONSTRUCTOR = "constructor";

    export const REACT_EXCLUDE_METHODS: IReactExcludeMethods = {
        render: true,
        setState: true,
        forceUpdate: true,
        UNSAFE_componentWillUpdate: true,
        UNSAFE_componentWillMount: true,
        getChildContext: true,
        componentWillMount: true,
        componentDidMount: true,
        componentWillReceiveProps: true,
        shouldComponentUpdate: true,
        componentWillUpdate: true,
        componentDidUpdate: true,
        componentWillUnmount: true,
        componentDidCatch: true,
        getSnapshotBeforeUpdate: true,
    };
}
