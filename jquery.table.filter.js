;(function ( $, window, document, undefined ) {
    var pluginName = 'tableFilter',
        defaults = {
            itemSelector: 'tr:has(td)',
            column: 0,
            keyword: '',
            revert: false
        };

    function Plugin( element, options ) {
        this.element = element;
        $this = $(this.element);
        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.filter(this.options.keyword, this.options.column, this.options.revert);
    }

    Plugin.prototype.filter = function (keyword, column, revert) {
        if(typeof revert === 'undefined') {
            revert = false;
        }
        var that = this;
        $this.slideUp(function(){
            $this.find(that.options.itemSelector).each(function(index, item){
                if(!revert && $(item).find('td:eq(' + column + ')').text() !== keyword) {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            });
            $this.slideDown();
        });
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
            } else {
                $.data(this, 'plugin_' + pluginName).filter(options.keyword, options.column, options.revert);
            }
        });
    };

})( jQuery, window, document );