import { Children } from "react";

export const Show = (props: any) => {
    let when:any = null;
    let otherwise = null;
    Children.forEach(props.children, children => {
        if(children.props.isTrue === undefined) {
            otherwise = children;
        } else if(!when && (children.props.isTrue || children.props.isTrue === true)) {
            when = children;
        }
    });
    return when || otherwise;
}
Show.when = ({isTrue, children} : {
    isTrue: any;
    children: React.ReactNode;
}) => isTrue && children;
Show.Else = ({ children}: {
    children: any | null | undefined;
}) => children;