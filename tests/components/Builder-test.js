goog.require('AutoMan.ui.components.Factory');
goog.require('AutoMan.ui.components.AbstractComponent');

goog.require('AutoMan.ui.Builder');

var content = [
  {
    "content": [
      {
        "content": {
          "text": "Scenario"
        },
        "id": "scenario",
        "type": "h2"
      },
      {
        "content": {
          "text": "Keeping up with online news and passing on relevant stories to his team was part of Frank\u2019s job at Target headquarters. From time to time he also included funny stories to promote a Fast, Fun and Friendly environment. One morning, Frank received a joke from a friend and was getting ready to forward it to his team when he realized that it made fun of immigrants. Frank knew it wasn\u2019t right for him to pass on that kind of content, so he deleted the email. By doing so, he avoided an investigation into whether he had violated our Harassment-Free Workplace Policy."
        },
        "type": "p"
      },
      {
        "content": {
          "text": "Welcome One, Welcome All"
        },
        "id": "welcome_one_welcome_all",
        "type": "h2"
      },
      {
        "content": {
          "text": "Discrimination and harassment aren\u2019t tolerated, period\u2014in hiring, training, advancement, compensation, discipline or termination. For starters, discrimination and harassment are illegal. But they\u2019re also counter to everything we stands for."
        },
        "type": "p"
      },
      {
        "content": {
          "text": "Diversity"
        },
        "id": "diversity",
        "type": "h2"
      },
      {
        "content": {
          "text": "Part of what makes us so unique is our commitment to building a diverse team. Different people with different backgrounds have different ways of seeing the world and different tools for solving problems. The more diverse our team, the more likely we are to hit on the great, game-changing ideas that make us one of the most innovative companies in the industry."
        },
        "type": "p"
      },
      {
        "content": {
          "text": "Equality Opportunity Employer"
        },
        "id": "equality_opportunity_employer",
        "type": "h2"
      },
      {
        "content":{
            "text": "We're an Equal Opportunity Employer; we train team members and managers on what that means, including your right to be protected from retaliation if you make a good-faith complaint of discrimination or harassment, participate in an investigation of such conduct or oppose unlawful practices."
          },
        "type": "p"
      },
      {
        "content": {
          "text": "Apply Knowledge"
        },
        "id": "apply_knowledge",
        "type": "h2"
      },
      {
        "content": {
          "text": "Is what I\u2019m about to say or do offensive to any individual or group?"
        },
        "type": "p"
      },
      {
        "content": {
          "text": "Additional Resources"
        },
        "id": "additional_resources",
        "type": "h2"
      },
      {
        "content": {
          "text": "Links to resources and policies"
        },
        "type": "p"
      }
    ],
    "id": "workplace_issues",
    "type": "section"
  }];

var P = function(options) {
	goog.base(this);
};

goog.inherits(P, AutoMan.ui.components.AbstractComponent);

goog.object.extend(P, AutoMan.ui.components.AbstractComponent);

P.supportedContent = function() {
	return 'p';
}

var H2 = function(options) {
	goog.base(this);
};

goog.inherits(H2, AutoMan.ui.components.AbstractComponent);

goog.object.extend(H2, AutoMan.ui.components.AbstractComponent);

H2.supportedContent = function() {
	return 'h2';
}

var Section = function(options) {
	goog.base(this);
};

goog.inherits(Section, AutoMan.ui.components.AbstractComponent);

goog.object.extend(Section, AutoMan.ui.components.AbstractComponent);

Section.supportedContent = function() {
	return 'section';
}

goog.require('AutoMan.ui.components.Root');

describe('AutoMan.ui.Builder', function() {

	beforeEach(function() {
		var factory = new AutoMan.ui.components.Factory();

		builder = new AutoMan.ui.Builder(content, factory);

		factory.register(P);
		factory.register(H2);
		factory.register(Section);
		factory.register(AutoMan.ui.components.Root);	
	});

	describe('asdas', function() {
		it('do stuff', function() {
			builder.parse();

		});
	});
});

