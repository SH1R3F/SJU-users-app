export default function useSteps() {
	// our plugin and our template code will make use of 'steps'
	const steps = reactive({})

	const stepPlugin = (node) => {
		// only runs for <FormKit type="group" />
		if (node.props.type == "group") {
			// build up our steps object
			steps[node.name] = steps[node.name] || {}

			// add the current group's reactive validity
			node.on("created", () => {
				steps[node.name].valid = toRef(node.context.state, "valid")
			})

			// Stop plugin inheritance to descendant nodes.
			// We only care about the the top-level groups
			// that represent the steps.
			return false
		}
	}
}
