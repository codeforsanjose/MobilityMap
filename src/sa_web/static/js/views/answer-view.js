var Shareabouts = Shareabouts || {};

(function(S, $, console){
  S.AnswerView = Backbone.View.extend({
    events: {
      'change #answer': 'onAnswerChange'
    },

    initialize: function() {
      this.collection.on('reset', this.onChange, this);
      this.collection.on('add', this.onChange, this);
      this.collection.on('remove', this.onChange, this);

      this.updateAnswerStatus();
    },

    render: function() {
      // I don't understand why we need to redelegate the event here, but they
      // are definitely unbound after the first render.
      this.delegateEvents();

      this.$el.html(Handlebars.templates['place-detail-answer']({
        count: this.collection.size() || '',
        user_token: this.options.userToken,
        is_answering: (this.userAnswer !== undefined),
        answer_config: this.options.answerConfig
      }));

      return this;
    },

    remove: function() {
      // Nothing yet
    },

    getAnswerStatus: function(userToken) {
      return this.collection.find(function(model) {
        return model.get('user_token') === userToken;
      });
    },

    updateAnswerStatus: function() {
      this.userAnswer = this.getAnswerStatus(this.options.userToken);
    },

    onChange: function() {
      this.updateAnswerStatus();
      this.render();
    },

    onAnswerChange: function(evt) {
      var self = this,
          checked = evt.target.checked,
          $form,
          attrs,
          userAnswer;

      evt.target.disabled = true;
      S.Util.log('USER', 'place', 'answer-btn-click', self.collection.options.placeModel.getLoggingDetails(), self.collection.size());

      if (checked) {
        $form = this.$('form');
        attrs = S.Util.getAttrs($form);
        this.collection.create(attrs, {
          wait: true,
          beforeSend: function($xhr) {
            // Do not generate activity for anonymous answers
            if (!S.bootstrapped.currentUser) {
              $xhr.setRequestHeader('X-Shareabouts-Silent', 'true');
            }
          },
          success: function() {
            S.Util.log('USER', 'place', 'successfully-answer', self.collection.options.placeModel.getLoggingDetails());
          },
          error: function() {
            self.getAnswerStatus(self.options.userToken).destroy();
            alert('Oh dear. It looks like that didn\'t save.');
            S.Util.log('USER', 'place', 'fail-to-answer', self.collection.options.placeModel.getLoggingDetails());
          }
        });
      } else {
        userAnswer = this.userAnswer;
        this.userAnswer.destroy({
          wait: true,
          success: function() {
            S.Util.log('USER', 'place', 'successfully-unanswer', self.collection.options.placeModel.getLoggingDetails());
          },
          error: function() {
            self.collection.add(userAnswer);
            alert('Oh dear. It looks like that didn\'t save.');
            S.Util.log('USER', 'place', 'fail-to-unanswer', self.collection.options.placeModel.getLoggingDetails());
          }
        });
      }
    }
  });

})(Shareabouts, jQuery, Shareabouts.Util.console);
