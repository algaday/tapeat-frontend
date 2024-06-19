import { Stack, StackProps } from "@mui/material"

export const withStack = <P extends object>(
	WrappedComponent: React.ComponentType<P>,
	stackProps?: StackProps,
) => {
	const ComponentWithStack = (props: P) => {
		return (
			<Stack {...stackProps}>
				<WrappedComponent {...props} />
			</Stack>
		)
	}

	return ComponentWithStack
}
