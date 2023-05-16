import {
  TeamsActivityHandler,
  CardFactory,
  TurnContext,
  MessagingExtensionResponse,
  AppBasedLinkQuery,
  TaskModuleRequest,
  TaskModuleResponse,
  AdaptiveCardInvokeResponse,
  AdaptiveCardInvokeValue,
} from "botbuilder";
import helloWorldCard from "./adaptiveCards/helloWorldCard.json";
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";

export class LinkUnfurlingApp extends TeamsActivityHandler {
  constructor() {
    super();
  }

  // Link Unfurling.
  public async handleTeamsAppBasedLinkQuery(
    context: TurnContext,
    query: AppBasedLinkQuery
  ): Promise<MessagingExtensionResponse> {
    // When the returned card is an adaptive card, the previewCard property of the attachment is required.
    const previewCard = CardFactory.thumbnailCard("Preview Card", query.url, [
      "https://raw.githubusercontent.com/microsoft/botframework-sdk/master/icon.png",
    ]);

    const data = { url: process.env.BOT_DOMAIN, appId: process.env.TEAMS_APP_ID };
    const renderedCard = AdaptiveCards.declare(helloWorldCard).render(data);
    const attachment = { ...CardFactory.adaptiveCard(renderedCard), preview: previewCard };

    return {
      composeExtension: {
        type: "result",
        attachmentLayout: "list",
        attachments: [attachment],
        suggestedActions: {
          actions: [
            {
              title: "default",
              type: "setCachePolicy",
              value: '{"type":"no-cache"}',
            },
          ],
        },
      },
    };
  }

  // public async handleTeamsTaskModuleFetch(context: TurnContext, taskModuleRequest: TaskModuleRequest): Promise<TaskModuleResponse> {
  //   return {
  //     task: {
  //       type: "continue",
  //       value: {
  //         title: "Task Module Fetch",
  //         height: 200,
  //         width: 400,
  //         card: CardFactory.adaptiveCard({
  //           version: '1.0.0',
  //           type: 'AdaptiveCard',
  //           body: [
  //             {
  //               type: 'TextBlock',
  //               text: 'Enter Text Here'
  //             },
  //             {
  //               type: 'Input.Text',
  //               id: 'usertext',
  //               placeholder: 'add some text and submit',
  //               IsMultiline: true
  //             }
  //           ],
  //           actions: [
  //             {
  //               type: 'Action.Submit',
  //               title: 'Submit'
  //             }
  //           ]
  //         })
  //       },
  //     },
  //   };
  // }

  // public async onAdaptiveCardInvoke(context: TurnContext, invokeValue: AdaptiveCardInvokeValue): Promise<AdaptiveCardInvokeResponse> {
  //   const card = {
  //     "type": "AdaptiveCard",
  //     "body": [
  //       {
  //         "type": "TextBlock",
  //         "text": "Your reponse was sent to the app",
  //         "size": "Medium",
  //         "weight": "Bolder",
  //         "wrap": true
  //       },
  //     ],
  //     "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  //     "version": "1.4"
  //   };
  //   const res = { statusCode: 200, type: "application/vnd.microsoft.card.adaptive", value: card };
  //   return res;
  // }

  // public async handleTeamsTaskModuleSubmit(context: TurnContext, taskModuleRequest: TaskModuleRequest): Promise<TaskModuleResponse> {
  //   return {
  //     task: {
  //       type: 'message',
  //       value: 'Thanks!'
  //     }
  //   };
  // }


  // Zero Install Link Unfurling
  public async handleTeamsAnonymousAppBasedLinkQuery(
    context: TurnContext,
    query: AppBasedLinkQuery
  ): Promise<MessagingExtensionResponse> {
    // When the returned card is an adaptive card, the previewCard property of the attachment is required.
    const previewCard = CardFactory.thumbnailCard("Preview Card", query.url, [
      "https://raw.githubusercontent.com/microsoft/botframework-sdk/master/icon.png",
    ]);

    const attachment = { ...CardFactory.adaptiveCard(helloWorldCard), preview: previewCard };

    return {
      composeExtension: {
        type: "result",
        attachmentLayout: "list",
        attachments: [attachment],
        suggestedActions: {
          actions: [
            {
              title: "default",
              type: "setCachePolicy",
              value: '{"type":"no-cache"}',
            },
          ],
        },
      },
    };
  }
}
