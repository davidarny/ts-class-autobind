export interface IReactExcludeMethods {
    getChildContext: boolean;
    render: boolean;
    componentWillMount: boolean;
    componentDidMount: boolean;
    componentWillReceiveProps: boolean;
    shouldComponentUpdate: boolean;
    componentWillUpdate: boolean;
    componentDidUpdate: boolean;
    componentWillUnmount: boolean;
    componentDidCatch: boolean;
    getSnapshotBeforeUpdate: boolean;

    [key: string]: boolean;
}
