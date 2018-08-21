import { IReactExcludeMethods } from "./IReactExcludeMethods";

export namespace Const {
    export const REACT_EXCLUDE_METHODS: IReactExcludeMethods = {
        getChildContext: true,
        render: true,
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
