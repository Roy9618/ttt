// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler, MessageFactory, CardFactory } = require('botbuilder');
const { ActionTypes } = require('botframework-schema');
const MentionSupport = require('../resources/mentionSupport.json');
const InformationMaskingCard = require('../resources/informationMasking.json');
const SampleAdaptiveCard = require('../resources/sampleAdaptiveWithFullWidth.json');
const StageViewImagesCard = require('../resources/stageViewForImages.json');
const OverFlowMenuCard = require('../resources/overflowMenu.json');
const HTMLConnectorCard = require('../resources/formatHTMLConnectorCard.json');
const CardWithEmoji = require('../resources/adaptiveCardWithEmoji.json');
const PeoplePersonaCardIcon = require('../resources/adaptivePeoplePersonaCardIcon.json');
const PeoplePersonaCardSetIcon = require('../resources/adaptivePeoplePersonaCardSetIcon.json');
const CodeBlocksCard = require('../resources/codeBlocksCard.json');
const AdaptiveCardResponsiveLayout = require('../resources/AdaptiveCardResponsiveLayout.json');
const AdaptiveCardBorders = require('../resources/adaptiveCardBorders.json');
const AdaptiveCardRoundedCorners = require('../resources/adaptiveCardRoundedCorners.json');
const adaptiveCardFluentIcons = require('../resources/adaptiveCardFluentIcon.json');
const adaptiveCardMediaElements = require('../resources/adaptiveCardMediaElements.json');
const adaptiveCardStarRatings = require('../resources/adaptiveCardStarRatings.json');
const adaptiveCardConditional = require('../resources/adaptiveCardConditional.json');
const adaptiveCardScrollable = require('../resources/adaptiveCardScrollable.json');
const adaptiveCardCompoundButton = require('../resources/adaptiveCardCompoundButton.json');

class BotFormattingCards extends ActivityHandler {
    constructor() {
        super();

        this.onMembersAdded(async (context, next) => {
            //Send welcome message when app installed
            await this.sendWelcomeMessage(context);

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onMessage(async (context, next) => {
            const text = context.activity.text;

            // Create an array with the valid card options.
            const adaptiveFormatCards = ['CodeBlock', 'MentionSupport', 'InfoMasking', 'FullWidthCard', 'StageViewImages', 'OverflowMenu', 'HTMLConnector', 'CardWithEmoji','Persona','PersonaSet','Layout', 'Borders', 'RoundedCorners', 'FluentIcons', 'MediaElements','StarRatings', 'ConditionalCard', 'ScrollableContainer', 'CompoundButton'];

            // If the `text` is in the Array, a valid card was selected and sends.
            if (adaptiveFormatCards.includes(text)) {

                switch (text) {
                    case "MentionSupport":
                        await context.sendActivity({ attachments: [this.sendMentionSupportCard()] });
                        break;

                    case "InfoMasking":
                        await context.sendActivity({ attachments: [this.sendInfoMasking()] });
                        break;

                    case "FullWidthCard":
                        await context.sendActivity({ attachments: [this.SendfullWidthCard()] });
                        break;

                    case "StageViewImages":
                        await context.sendActivity({ attachments: [this.sendStageViewImagesCard()] });
                        break;

                    case "OverflowMenu":
                        await context.sendActivity({ attachments: [this.sendOverFlowMenuCard()] });
                        break;

                    case "HTMLConnector":
                        await context.sendActivity({ attachments: [this.sendHTMLConnectorCard()] });
                        break;

                    case "CardWithEmoji":
                        await context.sendActivity({ attachments: [this.sendCardWithEmoji()] });
                        break;

                    case "Persona":
                        await context.sendActivity({ attachments: [this.sendPersonaCardIcons()] });
                        break;

                    case "PersonaSet":
                        await context.sendActivity({ attachments: [this.sendPersonaCardSetIcons()] });
                        break;

                    case "CodeBlock":
                        await context.sendActivity({ attachments: [this.sendCodeBlock()] });
                        break;
                    
                    case "Layout":
                        await context.sendActivity({ attachments: [this.sendLayoutCard()] });
                        break;

                    case "Borders":
                        await context.sendActivity({ attachments: [this.sendBordersCard()] });
                        break;

                    case "RoundedCorners":
                        await context.sendActivity({ attachments: [this.sendRoundedCornersCard()] });
                        break;

                    case "FluentIcons":
                        await context.sendActivity({ attachments: [this.SendFluentIconsCard()] });
                        break;

                    case "MediaElements":
                        await context.sendActivity({ attachments: [this.SendMediaElementsCard()] });
                        break;

                    case "StarRatings":
                        await context.sendActivity({ attachments: [this.SendStarRatingsCard()] });
                        break;

                    case "ConditionalCard":
                        await context.sendActivity({ attachments: [this.SendConditionalCard()] });
                        break;

                    case "ScrollableContainer":
                        await context.sendActivity({ attachments: [this.SendScrollableCard()] });
                        break;

                    case "CompoundButton":
                        await context.sendActivity({ attachments: [this.SendCompoundButtonCard()] });
                        break;
                }

                await context.sendActivity(`You have Selected <b>${text}</b>`);
            }
            else if (context.activity.value != null && context.activity.text == undefined) {

                const activityValue = context.activity.value;
               
                // Star ratings in Adaptive Cards
                if (activityValue.hasOwnProperty('rating1') && activityValue.hasOwnProperty('rating2')) 
                {
                    await context.sendActivity(`Ratings Feedback: ${JSON.stringify(activityValue)}`);
                }
            }

            // After the bot has responded send the fromat Cards.
            await this.sendAdaptiveCardFromats(context);

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }

    /**
     * Send a welcome message along with Adaptive card format actions for the user to click.
     * @param {TurnContext} turnContext A TurnContext instance containing all the data needed for processing this conversation turn.
     */
    async sendWelcomeMessage(turnContext) {
        const { activity } = turnContext;

        // Iterate over all new members added to the conversation.
        for (const idx in activity.membersAdded) {
            if (activity.membersAdded[idx].id !== activity.recipient.id) {
                const welcomeMessage = `Welcome to Adaptive Card Format. This bot will introduce you to different types of formats. Please select the cards from given options`;

                await turnContext.sendActivity(welcomeMessage);

                //send the adaptive card formats.
                await this.sendAdaptiveCardFromats(turnContext);
            }
        }
    }

    /**
    * Sends Mention Support Card
    */
    sendMentionSupportCard() {
        return CardFactory.adaptiveCard(MentionSupport);
    }

    sendCodeBlock() {
        return CardFactory.adaptiveCard(CodeBlocksCard);
    }

    /**
    * Adaptive Card updated to be responsive using targetWidth.
    */
    sendLayoutCard() {
        return CardFactory.adaptiveCard(AdaptiveCardResponsiveLayout);
    }

    /**
    * Sends Sample Adaptive Card With Full Width
    */
    SendfullWidthCard() {
        return CardFactory.adaptiveCard(SampleAdaptiveCard);
    }

    /**
    * Sends StageView Images Card
    */
    sendStageViewImagesCard() {
        return CardFactory.adaptiveCard(StageViewImagesCard);
    }

    /**
    * Sends InfoMasking Card
    */
    sendInfoMasking() {
        return CardFactory.adaptiveCard(InformationMaskingCard);
    }

   /**
    * Sends OverFlow Menu Card
    */
    sendOverFlowMenuCard() {
        return CardFactory.adaptiveCard(OverFlowMenuCard);
    }

    /**
    * Sends HTML Connector Card
    */
    sendHTMLConnectorCard() {
        return CardFactory.o365ConnectorCard(HTMLConnectorCard);
    }

    /**
    * Sends Card With Emoji
    */
    sendCardWithEmoji() {
        return CardFactory.adaptiveCard(CardWithEmoji);
    }

     /**
    * Persona card Icon in an Adaptive Card
    * If you want to show a single user in an Adaptive Card, the Adaptive Card displays the people icon and the name of the user.
    */
     sendPersonaCardIcons() {
        return CardFactory.adaptiveCard(PeoplePersonaCardIcon);
    }

     /**
    * Persona Card Set Icon in an Adaptive Card
    * If you want to show multiple users in an Adaptive Card, the Adaptive Card displays only the people icon of the users.
    */
     sendPersonaCardSetIcons() {
        return CardFactory.adaptiveCard(PeoplePersonaCardSetIcon);
    }

     /**
    * Sends Card showing the use of Borders on columns, columnsets, containers, etc.,
    */
    sendBordersCard() {
        return CardFactory.adaptiveCard(AdaptiveCardBorders);
    }

     /**
    Sends Card showing the use of Rounded Corners on columns, columnsets, containers, tables, etc.,
    */
    sendRoundedCornersCard() {
        return CardFactory.adaptiveCard(AdaptiveCardRoundedCorners);
    }

     /**
    Generates an Adaptive Card attachment that includes Fluent icons. 
    This method reads the adaptive card JSON from a resource file and deserializes it to be included as an attachment with Fluent icons in the card.
    Fluent icons provide a modern and visually appealing way to enhance the UI within Adaptive Cards.
    */
    SendFluentIconsCard() {
        return CardFactory.adaptiveCard(adaptiveCardFluentIcons);
    }

    /**
     Creates and returns an Attachment containing an adaptive card with media elements.
    */
    SendMediaElementsCard() {
        return CardFactory.adaptiveCard(adaptiveCardMediaElements);
    }

    /**
     Sends a star ratings card as an attachment for displaying or collecting user feedback.
    */
     SendStarRatingsCard() {
        return CardFactory.adaptiveCard(adaptiveCardStarRatings);
    }

    /**
     Sends a Conditional Action.submit button enable card
    */
     SendConditionalCard() {
        return CardFactory.adaptiveCard(adaptiveCardConditional);
    }

    /**
     Sends a Scrollable container adaptive card
    */
     SendScrollableCard() {
        return CardFactory.adaptiveCard(adaptiveCardScrollable);
    }

    /**
     Sends a Compound Button adaptive card
    */
     SendCompoundButtonCard() {
        return CardFactory.adaptiveCard(adaptiveCardCompoundButton);
    }

    /**
   * Send AdaptiveCard Fromats to the user.
   * @param {TurnContext} turnContext A TurnContext instance containing all the data needed for processing this conversation turn.
   */
    async sendAdaptiveCardFromats(turnContext) {
        const cardActions = [
            {
                type: ActionTypes.ImBack,
                title: 'MentionSupport',
                value: 'MentionSupport'
            },
            {
                type: ActionTypes.ImBack,
                title: 'InfoMasking',
                value: 'InfoMasking'
            },
            {
                type: ActionTypes.ImBack,
                title: 'FullWidthCard',
                value: 'FullWidthCard'
            },
            {
                type: ActionTypes.ImBack,
                title: 'StageViewImages',
                value: 'StageViewImages'
            },
            {
                type: ActionTypes.ImBack,
                title: 'OverflowMenu',
                value: 'OverflowMenu'
            },
            {
                type: ActionTypes.ImBack,
                title: 'HTMLConnector',
                value: 'HTMLConnector'
            },
            {
                type: ActionTypes.ImBack,
                title: 'CardWithEmoji',
                value: 'CardWithEmoji'
            },
            {
                type: ActionTypes.ImBack,
                title: 'Persona',
                value: 'Persona'
            },
            {
                type: ActionTypes.ImBack,
                title: 'PersonaSet',
                value: 'PersonaSet'
            },
            {
                type: ActionTypes.ImBack,
                title: 'CodeBlock',
                value: 'CodeBlock'
            },
            {
                type: ActionTypes.ImBack,
                title: 'Layout',
                value: 'Layout'
            },
            {
                type: ActionTypes.ImBack,
                title: 'Borders',
                value: 'Borders'
            },
            {
                type: ActionTypes.ImBack,
                title: 'RoundedCorners',
                value: 'RoundedCorners'
            },
            {
                type: ActionTypes.ImBack,
                title: 'FluentIcons',
                value: 'FluentIcons'
            },
            {
                type: ActionTypes.ImBack,
                title: 'MediaElements',
                value: 'MediaElements'
            },
            {
                type: ActionTypes.ImBack,
                title: 'StarRatings',
                value: 'StarRatings'
            },
            {
                type: ActionTypes.ImBack,
                title: 'ConditionalCard',
                value: 'ConditionalCard'
            },
            {
                type: ActionTypes.ImBack,
                title: 'ScrollableContainer',
                value: 'ScrollableContainer'
            },
            {
                type: ActionTypes.ImBack,
                title: 'CompoundButton',
                value: 'CompoundButton'
            }
        ];

        await this.sendWelcomeCard(turnContext, cardActions);
    }

    async sendWelcomeCard(context, cardActions) {
        const initialValue = {
            count: 0
        };
        const card = CardFactory.heroCard(
            'Please select a card from given options. ',
            '',
            null,
            cardActions
        );
        await context.sendActivity(MessageFactory.attachment(card));
    }
}

module.exports.BotFormattingCards = BotFormattingCards;