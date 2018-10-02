#!/usr/bin/perl

##################################################################
# 
# MaximaWithTimeout, a wrapper to Maxima program with timeout 
# control to prevent forever execution
#
# Copyright (C) 2007, Bowo Prasetyo
#  
# http://www.my-tool.com
# 
# This program is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License
# as published by the Free Software Foundation below,
# 
# http://www.gnu.org/licenses/gpl.html#TOC1
# 
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
# 
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, 
# MA  02110-1301, USA.
#
##################################################################

##################################################################
# Maxima is an open source program of computer algebra system
#
# Maxima can be obtained freely at
#
# http://maxima.sourceforge.net/
##################################################################

#
# Execute Maxima command
#

$ARGV[2] =~ s/("|\\)/\\\1/g;
my $maxima_pid = open(MAXIMA, $ARGV[1] . ' -q --batch-string="' . $ARGV[2] . '" |') || die "can't fork: $!";

my $child_pid = fork();
if (not defined $child_pid) 
{
   print "resources not available.\n?";
} 

#
# Kill Maxima after time out
#
elsif ($child_pid == 0) 
{
   sleep $ARGV[0];
   kill 9, $maxima_pid;
   print "Maxima has been terminated due to time limit.\n";
   exit(0);
} 

#
# Print out results
#
else 
{
   @lines = <MAXIMA>;
   close(MAXIMA) || die "can't close: $!";
   kill 9, $child_pid;
   print @lines;
   exit(0);
}
