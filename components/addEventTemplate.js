import {Page, Card, Layout, Select, TextField, Button} from '@shopify/polaris'
import { events, templates, shopifyFields, getTemplatesForEvent, getTemplateText } from '../api/dropdownOptions'
import api from '../api'

class EventTemplateConnector extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			eventSelected: '',
			templateNameSelected: '',
			templateNames: [],
			templateText: '',
			saveButtonDisabledStatus: true,
			variables: [],
			parameters: {}
		}
	}

	componentDidUpdate = async (prevProps, prevState) => {
		if (this.state.templateText !== prevState.templateText) {
			console.log('text changed')
			await api.getTemplateVariables(this.state.templateText)
				.then((res) => {
					if(res.data.length > 0) {
						this.setState({ variables: res.data })
					}
				}, (err) => {
					console.log(err)
				})
		}
	}

	handleEventSelectedChange = async (newValue, id) => {
		let selectedTemplates = await getTemplatesForEvent(newValue)

		console.log('templates returned', selectedTemplates)

		this.setState({ saveButtonDisabledStatus: false, eventSelected: newValue, templateNames: selectedTemplates, templateText: '', variables: [], parameters: {}, templateNameSelected: ''})
		
	}

	handleTemplateNameChange = async (newValue, id) => {
		let selectedTemplateText = await getTemplateText(newValue) 
		
		this.setState({ 
			saveButtonDisabledStatus: false, 
			templateText: selectedTemplateText, 
			templateNameSelected: newValue
		})
	}

	saveEventTemplate = () => {
		console.log('saving', this.state)
	}

	

	render () {
		console.log(this.props)

		const handleVariableValue = (variable) => {
			return(newValue) => {
				let varValJson = this.state.parameters
				varValJson[variable] = newValue
				this.setState({ parameters : varValJson })
			}
		}

		return (
			<Page title="Choose Templates for Shopify Events" primaryAction={
					<Button>Add New Template</Button>
			}>
				
						<Card sectioned title="Choose Events and Templates">
							<Card.Section>
								<Select 
									label="Event"
									options={events}
									placeholder="Select an Event"
									value={this.state.eventSelected}
									onChange={this.handleEventSelectedChange}
								/>
								<br></br>
								<Select 
									label="Template Name"
									options={this.state.templateNames}
									placeholder="Select a Template"
									value={this.state.templateNameSelected}
									onChange={this.handleTemplateNameChange}
								/>
								<br></br>
								<TextField
									disabled
									multiline={3}
									label="Template"
									placeholder="Template text"
									value={this.state.templateText}
								/> 
								<br></br>
								{
									this.state.variables.map((variable) => {
										return (
											<Select 
												label={variable}
												key={variable}
												options={shopifyFields}
												value={this.state.parameters[variable]}
												placeholder="Select a Shopify variable"
												onChange={handleVariableValue(variable)}
											/>
										)
									})
								}
								<br></br>
								<Button primary disabled={this.state.saveButtonDisabledStatus} onClick={this.saveEventTemplate}>
									Save
								</Button>

							</Card.Section>
						</Card>
					
			</Page>
		)
	}
}

export default EventTemplateConnector